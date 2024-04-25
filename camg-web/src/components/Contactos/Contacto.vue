<script setup>
import {inject} from "vue";
import {useContactoStore} from "@/stores/contacto.js";

const props = defineProps(["contacto"])
const serverBaseUrl = inject("serverBaseUrl");
const contactoStore = useContactoStore();

</script>
<template>
  <div class="p-2 m-2 w-min-5/6">
    <div class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
      <div class="flex-row px-1 pt-6">
        <h1 class="relative z-10 mb-2 text-lg text-bold text-gray-600">{{ props.contacto.valor }}</h1>
      </div>
    </div>
  </div>
</template>