<script setup>
import {inject} from "vue";

const props = defineProps(["noticia"])
const serverBaseUrl = inject("serverBaseUrl");
</script>
<template>
  <div class="min-w-60 max-w-72 m-3 p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
      <div class="relative">
        <a class="flex bg-white block w-full h-52 shadow-xl rounded-xl">
            <img v-if="!props.noticia.img_noticia" :src="`${serverBaseUrl}/storage/fotos/${props.noticia.img_noticia[0]}`" :alt="`${serverBaseUrl}/storage/fotos/${props.noticia.img_noticia[0]}`"
                 class="my-auto mx-auto w-44 shadow-soft-2xl">
        </a>
      </div>
      <h1 class="text-xs mx-1 mt-1 font-bold text-amber-400 flex justify-end">{{props.noticia.data}}</h1>
      <div class="flex-auto px-1 pt-6">
        <h1 class="relative z-10 mb-2 leading-normal font-bold text-lg text-gray-800">{{props.noticia.titulo}}</h1>
        <h1 class="relative z-10 mb-2 text-sm text-gray-600">{{props.noticia.conteudo}}</h1>

        <div class="flex items-center justify-between mt-2">
          <a type="button" class="m-4 px-6 py-2 rounded-lg border border-amber-400 text-amber-400 hover:text-black hover:bg-amber-400 hover:opacity-50 text-center text-sm uppercase align-middle transition-all">Ver</a>

        </div>
      </div>
    </div>
  </div>
</template>