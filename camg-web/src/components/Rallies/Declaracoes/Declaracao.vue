<script setup>
import {inject} from "vue";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useDeclaracaoStore} from "@/stores/declaracao.js";

const props = defineProps(["declaracao"])
const serverBaseUrl = inject("serverBaseUrl");
const declaracaoStore = useDeclaracaoStore();

</script>
<template>
  <div class="min-w-[10%] m-3 p-3 mb-6 max-h-[50%] min-h-[50%] lg:w-[23%] sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border max-h-full">
      <div class="relative">
        <a class="flex bg-white block w-full h-52 shadow-xl rounded-xl">
          <img :src="`${serverBaseUrl}/storage/declaracoes/${props.declaracao.photo_url}`" :alt="`${serverBaseUrl}/storage/declaracoes/${props.declaracao.photo_url}`"
               class="my-auto mx-auto object-contain  max-h-52 shadow-soft-2xl">
        </a>
      </div>
      <div class="flex-auto px-1 pt-6 overflow-y-auto scroll-smooth scroll-px-16">
        <h1 class="my-1 text-xl text-gray-600 font-bold">{{props.declaracao.nome}}</h1>
        <div class="flex flex-row flex-wrap mt-1 mb-2">
          <h1 class="text-lg text-amber-500 font-bold">{{props.declaracao.cargo}}</h1>
          <h1 v-if="props.declaracao.pontos" class="text-lg text-gray-800 font-bold ml-2"> - {{props.declaracao.pontos}} pontos</h1>
          <h1 v-if="props.declaracao.entidade_equipa" class="text-lg text-gray-800 font-bold ml-2"> - {{props.declaracao.entidade_equipa}}</h1>
        </div>
        <h1 class="relative z-10 mb-2 text-sm text-gray-600">{{props.declaracao.conteudo}}</h1>
      </div>
    </div>
  </div>
</template>
