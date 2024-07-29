<script setup>
import {inject} from "vue";
import {useNoticiaStore} from "@/stores/noticia.js";

const props = defineProps(["noticia"])
const serverBaseUrl = inject("serverBaseUrl");
const noticiaStore=useNoticiaStore();

</script>
<template>
  <div class="min-w-[25%] m-2 p-3 mb-6 max-h-[600px] lg:w-[32%] sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border h-full">
      <div class="relative">
        <a class="flex bg-white w-full h-52 shadow-xl rounded-xl">
          <img :src="`${serverBaseUrl}/storage/fotos/${props.noticia.title_img}`" :alt="`${serverBaseUrl}/storage/fotos/${props.noticia.title_img}`"
               class="my-auto mx-auto object-contain  max-h-52 shadow-soft-2xl">
        </a>
      </div>
      <div class="h-full overflow-y-auto scroll-smooth">
        <h1 class="text-xs mx-1 mt-1 text-amber-500 flex justify-start font-bold py-1">{{props.noticia.data}}</h1>
        <div class="flex-auto px-1 pt-6">
          <h1 class="relative z-10 mb-2 leading-normal font-bold text-lg text-gray-800">{{props.noticia.titulo}}</h1>
          <h1 class="relative z-10 mb-2 text-sm text-gray-600">{{props.noticia.conteudo}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>