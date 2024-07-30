<script setup>
import { CssSyntaxError } from "postcss";
import {inject} from "vue";

const props = defineProps(["conselhoSeguranca"])
const serverBaseUrl = inject("serverBaseUrl");

</script>
<template>
  <div class="inline-block max-h-[550px] w-full p-3 mb-6 lg:w-1/3 overflow-y-auto sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words h-full bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border items-center">
      <div class="flex flex-col w-11/12 m-2 h-full">
          <span class="rounded-xl p-2 my-1 text-lg">
            <b class="text-green-600">Conselho:</b> {{ conselhoSeguranca.descricao }}
          </span>
          <img class="w-full rounded-lg border-4 border-green-500 h-44 object-contain shadow-md shadow-green-300 " :src="`${serverBaseUrl}/storage/fotos/${conselhoSeguranca.img_conselho}`">
      </div>
      <div class="flex flex-col w-11/12 m-2 h-full">
          <span class="rounded-xl p-2 my-1 text-lg">
            <b class="text-red-600">Erro:</b> {{ conselhoSeguranca.erro }}
          </span>
          <img class="w-full rounded-lg border-4 h-44 object-contain border-red-500  shadow-md shadow-red-300" :src="`${serverBaseUrl}/storage/fotos/${conselhoSeguranca.img_erro}`">
      </div>
    </div>
  </div>
</template>