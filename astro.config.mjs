import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  // INFO: para que estén habilitados los enpoints
  output: "server",

  vite: {
    plugins: [tailwindcss()]
  }
});