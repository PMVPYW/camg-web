<script setup>
import { CssSyntaxError } from "postcss";
import {inject} from "vue";

const props = defineProps(["conselhoSeguranca"])
const serverBaseUrl = inject("serverBaseUrl");

</script>
<template>
  <div class="inline-block h-1/2 w-full overflow-y-auto p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div class="relative flex flex-row min-w-0 break-words h-full bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border max-h-52">
      <div class="flex flex-col w-5/12 m-2 h-full">
          Conselho:<br>
          <span class="rounded-xl bg-gray-100 p-2 my-1">
            {{ conselhoSeguranca.descricao }}
          </span>
          <img class="w-full rounded-lg border-2 h-36 object-cover" :src="`${serverBaseUrl}/storage/fotos/${conselhoSeguranca.img_conselho}`">
      </div>
      <div class="flex flex-col w-5/12 m-2 h-full">
          Erro:<br>
          <span class="rounded-xl bg-gray-100 p-2 my-1">
            {{ conselhoSeguranca.erro }}
          </span>
          <img class="w-full rounded-lg border-2 h-36" :src="`${serverBaseUrl}/storage/fotos/${conselhoSeguranca.img_conselho}`">
      </div>
    </div>
  </div>
</template>