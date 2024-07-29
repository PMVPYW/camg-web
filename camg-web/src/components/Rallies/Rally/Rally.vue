<script setup>
import {inject} from "vue";

const props = defineProps(["rally"])
const serverBaseUrl = inject("serverBaseUrl");
</script>
<template>
  <div class="inline-block h-1/4 m-2 w-full p-3 mb-6 lg:w-[32%] sm:flex-none">
    <div
        class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
      <div class="relative">
        <a class="block shadow-xl rounded-2xl bg-[#f8f9fe] h-64">
          <img v-if="props.rally.photo_url" :src="`${serverBaseUrl}/storage/fotos/${props.rally.photo_url}`" :alt="`${serverBaseUrl}/storage/fotos/${props.rally.photo_url}`"
               class="w-full h-full shadow-soft-2xl rounded-2xl object-cover">
        </a>
      </div>
      <div class="flex-auto px-1 pt-6">
        <p class="relative z-10 mb-2 leading-normal text-transparent bg-slate-700 text-sm bg-clip-text">
          {{ props.rally.data_inicio }} | {{ props.rally.data_fim }}</p>
        <a href="javascript:;">
          <h5>{{ props.rally.nome }}</h5>
        </a>


      </div>
    </div>
  </div>
</template>