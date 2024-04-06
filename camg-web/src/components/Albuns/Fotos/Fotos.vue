<script setup>
import {useRoute} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";
import {inject, onMounted, ref} from "vue";

const serverBaseUrl = inject("serverBaseUrl")
const route = useRoute();

const albumStore = useAlbumStore();
const album = ref({});
const fotos = ref([]);

onMounted(async ()=>{
  albumStore.getFotos(route.params.id).then((response) => {
    fotos.value = response;
  })
  if (!albumStore.albuns) {
    await albumStore.loadAlbuns();
  }
  album.value = albumStore.albuns.find((album) => album.id == Number(route.params.id));
})

</script>

<template>
  <div class="h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Fotos - {{album.nome}} </h1>
    <div class="mx-auto text-center border-4 w-11/12 rounded-lg">
      <img class="w-3/12 inline-block m-2 rounded-lg text-center" v-for="foto in fotos" :key="foto.id" :src="`${serverBaseUrl}/storage/fotos/${foto.image_src}`" />
    </div>
  </div>
</template>
