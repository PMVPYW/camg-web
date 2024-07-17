<script setup>
import {inject} from "vue";

const props = defineProps(["patrocinio"])
const serverBaseUrl = inject("serverBaseUrl");
console.log(props.patrocinio)
</script>
<template>
  <div class="min-w-60 max-w-72 m-3 p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border h-full">
      <div class="relative">
        <a class="flex bg-white block w-full h-52 shadow-xl rounded-xl">
          <img :src="`${serverBaseUrl}/storage/entidades/${props.patrocinio.entidade_id.photo_url}`" :alt="`${serverBaseUrl}/storage/entidades/${props.patrocinio.entidade_id.photo_url}`"
               class="my-auto mx-auto w-44 shadow-soft-2xl">
        </a>
      </div>
      <div class="flex flex-col justify-between h-full px-1 pt-6">
        <h1 class="relative z-10 mb-2 leading-normal font-bold text-lg text-gray-800">{{props.patrocinio.entidade_id.nome}}</h1>
        <div class="flex items-center justify-between mt-2">
          <a :href="props.patrocinio.entidade_id.url" type="button" class="m-1 px-6 py-2 rounded-lg border border-amber-400 text-amber-400 hover:text-black hover:bg-amber-400 hover:opacity-50 text-center text-sm uppercase align-middle transition-all">Ver</a>
        </div>
      </div>
    </div>
  </div>
</template>