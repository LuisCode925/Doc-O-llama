<script>
  import { Input, Label, Spinner } from "flowbite-svelte";
  import { setAppStatusError } from "../store"
  import { appStatusInfo } from "../store";
  const {uuid, origName, numPages} = $appStatusInfo;

  let answer = ""
  let loading = false;
  
  // Aqui mostraria imagenes del pdf si se utiliza Cloudinary
  const numOfPagesToShow = Math.min(numPages, 4);

    const url = 'http://192.168.1.204/pdf/{filename}/{page}';

    let images = Array.from({length: numOfPagesToShow }, (_, i) => {
      const real_page = i + 1;
      return url.replace('{filename}', `${uuid}`).replace('{page}',`${real_page}`)
    });
  // ================================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    loading = true;
    answer = ""
    const question = event.target.question.value;

    const searchParams = new URLSearchParams()
    searchParams.append('uuid', uuid)
    searchParams.append('question', question)

    try {
      const eventSource = new EventSource(`/api/ask?${searchParams.toString()}`)
      
      eventSource.onmessage = (event) => {
        loading = false
        const incomingData = JSON.parse(event.data)

        if (incomingData === '___Response_End___') {
          eventSource.close()
          return
        }
        answer += incomingData
      }
    } catch(error){
      setAppStatusError();
      console.error(error)
    } finally {
      loading = false;
    }
  };
</script>

<div class="grid grid-cols-4 gap-2">
  {#each images as image}
    <img
      class="rounded w-full h-auto aspect-[400/540]"
      src={image}
      alt={origName}
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
      />
    </Label>
  </div>
</form>

{#if loading}
  <div class="flex justify-center items-center flex-col gap-y-2">
    <Spinner />
    <p class="opacity-75">Esperando respuesta</p>
  </div>
{/if}

{#if answer }
  <div class="mt-8">
    <p class="font-medium">Respuesta:</p>
      <p>{answer}</p>
  </div>
{/if}