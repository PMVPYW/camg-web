<script setup>
import {inject} from "vue";
import {useContactoStore} from "@/stores/contacto.js";
import { Icon } from '@iconify/vue';


const props = defineProps(["prova"])
const serverBaseUrl = inject("serverBaseUrl");

</script>
<template>
  <div class="pb-1 my-2">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-2 py-2 rounded-xl bg-clip-border">
      <div class=" flex flex-row px-1 items-center justify-between">
        <div class="flex flex-row">
          <h1 class="text-xl text-gray-800 mx-4 font-bold">{{prova.nome}}</h1>
          <h1 v-if="prova.data_inicio" class="text-2xl text-gray-600">- {{ prova.data_inicio }}</h1>
        </div>
        <div class="flex items-center">
          <h1 class="text-2xl text-gray-600">{{ prova.local }}</h1>
          <Icon v-if="prova.kml_src" icon="gis:kml-file" class="mx-3 min-w-10 min-h-10"/>
        </div>
        <h1 class="text-xl text-amber-600 mx-4 font-bold">{{ prova.distancia_percurso/1000 }} Km</h1>
      </div>
    </div>
  </div>
</template>