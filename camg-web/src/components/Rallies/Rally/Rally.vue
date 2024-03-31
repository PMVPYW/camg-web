<script setup>
import {inject} from "vue";

const props = defineProps(["rally"])
const serverBaseUrl = inject("serverBaseUrl");
</script>
<template>
  <div class="inline-block h-1/4 w-full p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div
        class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
      <div class="relative">
        <a class="block shadow-xl rounded-2xl">
          <img :src="`${serverBaseUrl}/storage/fotos/${props.rally.photo_url}`" :alt="`${serverBaseUrl}/storage/fotos/${props.rally.photo_url}`"
               class="w-full shadow-soft-2xl rounded-2xl">
        </a>
      </div>
      <div class="flex-auto px-1 pt-6">
        <p class="relative z-10 mb-2 leading-normal text-transparent bg-slate-700 text-sm bg-clip-text">
          {{ props.rally.data_inicio }} | {{ props.rally.data_fim }}</p>
        <a href="javascript:;">
          <h5>{{ props.rally.nome }}</h5>
        </a>

        <div class="flex items-center justify-between mt-4">
          <button type="button"
                  class="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">
            Place Bid
          </button>

        </div>
      </div>
    </div>
  </div>
</template>