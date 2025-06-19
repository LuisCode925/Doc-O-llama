<script>
  import {
    setAppStatusLoading,
    setAppStatusError,
    setAppStatusChatMode,
  } from "../store.ts";
  import Dropzone from "svelte-file-dropzone";
  import { Badge } from "flowbite-svelte";

  let files = {
    accepted: [],
    rejected: [],
  };

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (acceptedFiles.length > 0) {

      
      setAppStatusLoading();

      // Get the form data 
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setAppStatusError();
        return;
      }

      const {uuid, originalName, totalPages, self} = await response.json();
      // console.log(response.json);
      setAppStatusChatMode({uuid, originalName, totalPages, self});
    }
  }
</script>

<div class="w-full">
  <h2 class="text-2xl mb-10 font-bold">Paso 1: Sube tu documento.</h2>
  <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
    <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <span class="sr-only">¡ATENCION!</span>
    <div>
      <span class="font-medium">Por el momento solo se pueden usar PDF.</span>
    </div>
  </div>
  {#if files.accepted.length === 0}
  <Dropzone
    on:drop={handleFilesSelect}
    multiple={true}
    accept="application/pdf">Arrastra los documentos que quires que el Doc O'llama revise.
  </Dropzone> 
  {/if}

<div>
  {#each files.accepted as item}
  <Badge rounded color="red" class="text-xl">{item.name}</Badge>
  {/each}
</div>

</div>