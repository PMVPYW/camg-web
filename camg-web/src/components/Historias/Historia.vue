<script setup>
import {inject} from "vue";

const props = defineProps(["historia"])
const serverBaseUrl = inject("serverBaseUrl");
</script>
<template>
  <div class="min-w-[25%] max-h-[600px] m-3 p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border h-full">
      <div class="relative">
        <a v-if="props.historia.photo_url" class="flex bg-white block w-full h-72	shadow-xl rounded-xl my-4">
          <img :src="`${serverBaseUrl}/storage/fotos/${props.historia.photo_url}`" :alt="`${serverBaseUrl}/storage/fotos/${props.historia.photo_url}`"
               class="my-auto mx-auto object-contain max-h-72 shadow-soft-2xl">
        </a>
      </div>
      <div class=" h-full overflow-y-auto scroll-smooth">
        <div class="flex-auto px-1 pt-6">
          <h1 class="relative z-10 mb-2 leading-normal font-bold text-xl text-gray-800">{{ props.historia.titulo }}</h1>
          <h1 class="relative z-10 mb-2 text-base font-bold text-gray-600">{{ props.historia.subtitulo }}</h1>
          <h1 v-if="props.historia.conteudo" class="relative z-10 mb-2 text-sm text-gray-600">{{ props.historia.conteudo }}</h1>
        </div>
        <div v-if="props.historia.capitulo.length" v-for="capitulo in props.historia.capitulo" class="flex-auto px-1 pt-6">
          <hr class="mb-3">
          <h1 class="relative z-10 mb-2 ml-2 leading-normal font-bold text-base text-gray-800">{{ capitulo.titulo }}</h1>
          <div v-if="capitulo.etapas.length" v-for="etapas in capitulo.etapas" class="flex flex-row ml-10">
            <div class="flex flex-row min-w-24">
              <h1 class="mb-2 text-base font-bold text-amber-500">{{ etapas.ano_inicio }}</h1>
              <h1 v-if="etapas.ano_fim" class="mb-2 text-base font-bold text-amber-500 ml-1">a {{ etapas.ano_fim }}</h1>
            </div>
            <h1 class="mb-2 text-base text-gray-600 ml-8">{{ etapas.nome }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>