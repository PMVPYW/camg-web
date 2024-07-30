<script setup>
import {useRoute} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";
import {inject, onMounted, ref, watch} from "vue";
import Modal from "@/components/common/SimpleModal.vue"
import {Icon} from '@iconify/vue';
import CrudButtons from "@/components/common/crudButtons.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import CreateFotoForm from "@/components/Albuns/Fotos/createFotoForm.vue";

const serverBaseUrl = inject("serverBaseUrl")
const route = useRoute();

const albumStore = useAlbumStore();
const fotoStore = useFotoStore();
const album = ref({});
const selected = ref({});
const opened = ref(false);

const nextFoto = () => {
  var current = fotoStore.fotos[fotoStore.currentAlbum].findIndex((item) => item.id == selected.value.id);
  current++;
  if (current >= fotoStore.fotos[fotoStore.currentAlbum].length) {
    current = 0;
  }
  selected.value = fotoStore.fotos[fotoStore.currentAlbum][current];
}

const previousFoto = () => {
  var current = fotoStore.fotos[fotoStore.currentAlbum].findIndex((item) => item.id == selected.value.id);
  current--;
  if (current < 0) {
    current = fotoStore.fotos[fotoStore.currentAlbum].length - 1;
  }
  selected.value = fotoStore.fotos[fotoStore.currentAlbum][current];
}

watch(selected, (n_selected) => {
  console.log(Object.keys(n_selected))
  if (Object.keys(n_selected).length > 0) {
    opened.value = true;
  } else {
    opened.value = false;
  }
  console.log(opened)
})

onMounted(async () => {
  if (!albumStore.albuns) {
    await albumStore.loadAlbuns();
    await fotoStore.loadFotos();
  }
  fotoStore.currentAlbum = route.params.id;
  album.value = albumStore.albuns.find((album) => album.id == Number(route.params.id));
})
</script>

<template>

  <div class="w-full h-11/12 rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Fotos - {{ album.nome }} </h1>
    <CrudButtons :create_form="CreateFotoForm" :create_callback="fotoStore.createFoto" :update_visible="false" :delete_visible="false"></CrudButtons>
    <div class="mx-auto text-center border-4 w-11/12 min-h-dvh rounded-lg">
      <img @click="()=>{selected = foto;}" class="w-3/12 inline-block m-2 rounded-lg text-center" v-for="foto in fotoStore.fotos[route.params.id]"
           :key="foto.id" :src="`${serverBaseUrl}/storage/fotos/${foto.image_src}`"/>
    </div>
  </div>
  <Modal @close-modal="()=>{selected = {}}" @click="()=>{selected = {}}" :opened="opened">
    <div class="h-screen w-8/12">
    <CrudButtons @click.stop :obj_to_edit="selected" @clearSelected="()=>{selected = {}}" :delete_form="SimpleDeleteForm" :create_form="CreateFotoForm" :edit_callback="fotoStore.updateFoto"  :delete_callback="fotoStore.deleteFoto" :create_visible="false"></CrudButtons>
    <div @click.stop="" class="w-full flex text-center justify-center items-center">
      <Icon @click.stop="previousFoto" icon="ooui:previous-ltr"
            class="inline border-4 rounded-full hover:bg-gray-500 hover:bg-gradient-to-tl from-amber-600 to-yellow-400 hover:text-white p-4 min-w-20 min-h-20 font-bold text-black mr-4"/>
      <img class="inline w-full h-full object-contain rounded-lg" :src="`${serverBaseUrl}/storage/fotos/${selected.image_src}`"/>
      <Icon @click.stop="nextFoto" icon="ooui:next-ltr"
            class="inline border-4 rounded-full hover:bg-gray-500 hover:bg-gradient-to-tl from-amber-600 to-yellow-400 hover:text-white p-4 min-w-20 min-h-20 font-bold text-black ml-4"/>
    </div>
    </div>
  </Modal>
</template>
