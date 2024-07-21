<script setup>
import {inject} from "vue";

const props = defineProps(["conselhoSeguranca"])
const serverBaseUrl = inject("serverBaseUrl");
</script>
<template>
  <div class="inline-block h-1/4 w-full p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div
        class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
    </div>
  </div>
</template>