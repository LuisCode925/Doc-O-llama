<script lang="ts">
  import { Button, Input, Label, Spinner } from "flowbite-svelte";
  import { setAppStatusError } from "../store"
  import { appStatusInfo } from "../store";
  const {uuid, originalName, totalPages, self} = $appStatusInfo;

  let answer = ""
  let loading = false;
  let showSpinner = false;
  
  // Aqui mostraria imagenes de manera aleatoria del PDF
  let images: string[] = [];
  if (totalPages <= 4) {
    for (let index = 0; index < totalPages; index++) {
      images.push(`${self}/${index}`);
    }
  } else {
    let randomPages = [];
  
    while (randomPages.length < 5) {
      const randomNumber = 0 + Math.floor(Math.random() * totalPages);
      if (!randomPages.includes(randomNumber)) randomPages.push(randomNumber);
    }

    randomPages.forEach((page) => {
      images.push(`${self}/${page}`);
    });
  }

  const handleSubmit = async (event: any) => {

    event.preventDefault();
    
    loading = true;
    showSpinner = true;
    answer = "";
    const question = event.target.question.value;

    const searchParams = new URLSearchParams();
    searchParams.append('uuid', uuid);
    searchParams.append('question', question);

    try {
      /*
      const llmResponse = await fetch(`/api/ask?${searchParams.toString()}`, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!llmResponse.ok) {
        loading = false;
        console.error("Error al hacer la pregunta.");
        return 
      }

      const { response } = await llmResponse.json();
      answer = response;*/

      const eventSource = new EventSource(`/api/ask?${searchParams.toString()}`);

      eventSource.onmessage = (event) => {
        loading = false;
        showSpinner = false;
        const incomingData = JSON.parse(event.data)

        if (incomingData === '___END___') {
          eventSource.close()
          return
        }
        answer += incomingData
        // console.log(answer);
      }
    } catch (e) {
      setAppStatusError();
    } finally {
      loading = false;
    }

  };
</script>

<div class="flex flex-col">

  <div class="grid grid-cols-5 gap-7 mb-7">
    {#each images as image}
    <img
    class="w-full h-auto hover:scale-105 hover:border-2"
    src={ image }
    alt={ originalName }
    />
    {/each}
  </div>
  
  <form on:submit={handleSubmit}>
    <div class="mb-6">
      <Label for="question" class="text-xl space-y-2">
        <span class="block mb-2">Deja aquí tu pregunta:</span>
        <Input
        id="question"
        required
        placeholder="¿Puede resumir el documento en 20 palabras o menos?"
        size="md"
        class="bg-white p-2 rounded-xl"
        />
      </Label>
    </div>
  </form>
  
  {#if showSpinner }
  <!-- flex justify-center items-center flex-col  -->
  <button type="button" class="bg-indigo-500 rounded-2xl text-white items-center w-fit px-3 py-3 flex" disabled>  
    <svg class="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    Esperando respuesta...
  </button>
  {/if}
  
  {#if answer }
  <div class="bg-sky-300/30 rounded-2xl p-7">
    <p class="font-bold">Respuesta:</p>
    <p class="font-normal">{answer}</p>
  </div>
  {/if}
</div>