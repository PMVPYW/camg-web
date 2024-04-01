<script setup>
import {inject} from "vue";

const props = defineProps(["patrocinio"])
const serverBaseUrl = inject("serverBaseUrl");
</script>
<template>
  <div class="max-w-72 m-3 p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
      <div class="relative">
        <a class="block shadow-xl rounded-2xl">
          <img :src="`${serverBaseUrl}/storage/entidades/${props.patrocinio.photo_url}`" :alt="`${serverBaseUrl}/storage/entidades/${props.patrocinio.photo_url}`"
               class="w-full shadow-soft-2xl rounded-2xl">
        </a>
      </div>
      <div class="flex-auto px-1 pt-6">
        <h1 class="relative z-10 mb-2 leading-normal font-bold text-lg text-gray-800">{{props.patrocinio.nome}}</h1>

        <div class="flex items-center justify-between mt-2">
          <a :href="props.patrocinio.url" type="button" class="m-4 px-6 py-2 rounded-lg border border-amber-400 text-amber-400 hover:text-black hover:bg-amber-400 hover:opacity-50 text-center text-sm uppercase align-middle transition-all">Ver</a>

        </div>
      </div>
    </div>
  </div>
</template>