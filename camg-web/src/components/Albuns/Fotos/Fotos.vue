<script setup>
import {useRoute} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";
import {inject, onMounted, ref, watch} from "vue";
import Modal from "@/components/common/SimpleModal.vue"

const serverBaseUrl = inject("serverBaseUrl")
const route = useRoute();

const albumStore = useAlbumStore();
const album = ref({});
const fotos = ref([]);
const selected = ref({});
const opened = ref(false);

watch (selected, (n_selected)=>{
  console.log(Object.keys(n_selected))
  if (Object.keys(n_selected).length > 0)
  {
    opened.value = true;
  } else {
    opened.value = false;
  }
  console.log(opened)
})


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
      <img @click="()=>{selected = foto;}" class="w-3/12 inline-block m-2 rounded-lg text-center" v-for="foto in fotos" :key="foto.id" :src="`${serverBaseUrl}/storage/fotos/${foto.image_src}`" />
    </div>
  </div>
  <Modal class="w-11/12" @click="()=>{selected = {}}" :opened="opened">
  <img class="w-3/4 h-5/6 cover rounded-lg" :src="`${serverBaseUrl}/storage/fotos/${selected.image_src}`" />
  </Modal>
</template>
