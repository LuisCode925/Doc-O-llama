<script lang="ts">
  import { Alert, span } from "flowbite-svelte";
  import { APP_STATUS, appStatus } from "../store.ts";
  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
  import StepBar  from "@componets/StepBar.svelte";
</script>
<!-- Se pone un $ para observar el valor de una store en svelte -->
<div class="flex flex-col gap-7 w-full">
  <div class="flex items-center">
    <!-- svelte-ignore component_name_lowercase -->
    <span class="h-px flex-1 bg-gray-300"></span>
    <!-- svelte-ignore component_name_lowercase -->
    <span class="shrink-0 px-4 text-2xl font-extrabold">Paso {$appStatus+1}/3</span>
    <!-- svelte-ignore component_name_lowercase -->
    <span class="h-px flex-1 bg-gray-300"></span>
  </div>

   <StepBar />
   {#if $appStatus === APP_STATUS.INIT}
   <StepUpload />
   {:else if $appStatus === APP_STATUS.LOADING}
   <StepLoading />
   {:else if $appStatus === APP_STATUS.CHAT_MODE}
   <StepChat />
   {:else if $appStatus === APP_STATUS.ERROR}
   <Alert>
     <!-- svelte-ignore component_name_lowercase -->
     <span class="font-medium">¡Que mala suerte tienes!</span>
     El Doc. O'llama esta atendiendo asuntos importantes, por que no lo intentas nuevamente más tarde.
    </Alert>
    {:else}
    <Alert>
      <!-- svelte-ignore component_name_lowercase -->
      <span class="font-medium">Esto no debería estar pasando</span>
      JAJAJA no te confundas, lo fallos engaños pueden ser.
    </Alert>
    {/if}
</div>