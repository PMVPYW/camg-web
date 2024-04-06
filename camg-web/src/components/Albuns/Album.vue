<script setup>
import {computed, inject, ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";

const props = defineProps(["album"])
const serverBaseUrl = inject("serverBaseUrl");
const rallyStore = useRallyStore();
const rallyName = ref(props.album.rally_id == null ? 'Nenhum' : rallyStore.rallies.find((item) => item.id == Number(props.album.rally_id)).nome);

watch(() => props.album, (n_album) => {
    rallyName.value = n_album.rally_id == null ? 'Nenhum' : rallyStore.rallies.find((item) => item.id == n_album.rally_id).nome
})

</script>
<template>
  <div class="inline-block h-1/4 w-full p-3 mb-6 lg:w-1/3 sm:flex-none">
    <div
        class="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl px-3 py-3 rounded-2xl bg-clip-border">
      <div class="relative">
        <a class="block shadow-xl rounded-2xl bg-[#f8f9fe] h-64">
          <img v-if="props.album.img" :src="`${serverBaseUrl}/storage/fotos/${props.album.img}`"
               :alt="`${serverBaseUrl}/storage/fotos/${props.album.img}`"
               class="w-full h-full shadow-soft-2xl rounded-2xl object-cover">
        </a>
      </div>
      <div class="flex-auto px-1 pt-6">
        <p class="relative z-10 mb-2 leading-normal text-transparent bg-slate-700 text-sm bg-clip-text">
          Rally: {{ rallyName }}</p>
        <a href="javascript:;">
          <h5>{{ props.album.nome }}</h5>
        </a>


      </div>
    </div>
  </div>
</template>