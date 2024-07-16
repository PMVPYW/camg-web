<script setup>
import {inject} from "vue";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useDeclaracaoStore} from "@/stores/declaracao.js";

const props = defineProps(["declaracao"])
const serverBaseUrl = inject("serverBaseUrl");
const declaracaoStore = useDeclaracaoStore();

</script>
<template>
  <div class="min-w-[25%] m-3 p-3 mb-6 max-h-[50%] min-h-[50%] lg:w-1/3 sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border max-h-full">
      <div class="relative">
        <a class="flex bg-white block w-full h-52 shadow-xl rounded-xl">

        </a>
      </div>
      <h1 class="text-xs mx-1 mt-1 text-amber-500 flex justify-start font-bold py-1">declaracao</h1>
      <div class="flex-auto px-1 pt-6 overflow-y-auto scroll-smooth scroll-px-16">
        <h1 class="relative z-10 mb-2 leading-normal font-bold text-lg text-gray-800">declaracao</h1>
        <h1 class="relative z-10 mb-2 text-sm text-gray-600">declaracao</h1>
      </div>
    </div>
  </div>
</template>
