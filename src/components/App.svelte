<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import { APP_STATUS, appStatus } from "../store.ts";

  import StepUpload from "./StepUpload.svelte";
  import StepLoading from "./StepLoading.svelte";
  import StepChat from "./StepChat.svelte";
</script>
<!-- Se pone un $ para observar el valor de una store en svelte -->
{#if $appStatus === APP_STATUS.INIT}
  <StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
  <StepLoading />
{:else if $appStatus === APP_STATUS.CHAT_MODE}
  <StepChat />
{:else if $appStatus === APP_STATUS.ERROR}
  <Alert>
    <span class="font-medium">¡Que mala suerte tienes!</span>
    El Doc. O'llama esta atendiendo asuntos importantes, por que no lo intentas nuevamente más tarde.
  </Alert>
{:else}
  <Alert>
    <span class="font-medium">Esto no debería estar pasando</span>
    JAJAJA no te confundas, lo fallos engaños pueden ser.
  </Alert>
{/if}
