<script setup>
import {useRoute} from "vue-router";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";
import {inject, onMounted, ref, watch} from "vue";
import Modal from "@/components/common/SimpleModal.vue"
import {Icon} from '@iconify/vue';
import CrudButtons from "@/components/common/crudButtons.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";

const serverBaseUrl = inject("serverBaseUrl")
const route = useRoute();

const albumStore = useAlbumStore();
const fotoStore = useFotoStore();
const album = ref({});
const selected = ref({});
const opened = ref(false);

const nextFoto = () => {
  var current = fotoStore.currentFotos.findIndex((item) => item.id == selected.value.id);
  current++;
  if (current >= fotoStore.currentFotos.length) {
    current = 0;
  }
  selected.value = fotoStore.currentFotos[current];
}

const previousFoto = () => {
  var current = fotoStore.currentFotos.findIndex((item) => item.id == selected.value.id);
  current--;
  if (current < 0) {
    current = fotoStore.currentFotos.length - 1;
  }
  selected.value = fotoStore.currentFotos[current];
}

const del_func = () => {
fotoStore.deleteFoto(selected.value)
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

document.onkeydown = (event)=>{
  event = event || window.event;
  if ("key" in event) {
    if (event.key == "Escape" || event.key == "Esc" )//esc
    {
      selected.value = {};
    }
  }
}


onMounted(async () => {
  fotoStore.getFotos(route.params.id)
  if (!albumStore.albuns) {
    await albumStore.loadAlbuns();
  }
  album.value = albumStore.albuns.find((album) => album.id == Number(route.params.id));
})

</script>

<template>

  <div class="w-full h-11/12 rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Fotos - {{ album.nome }} </h1>
    <CrudButtons :update_delete_visible="false"></CrudButtons>
    <div class="mx-auto text-center border-4 w-11/12 min-h-dvh rounded-lg">
      <img @click="()=>{selected = foto;}" class="w-3/12 inline-block m-2 rounded-lg text-center" v-for="foto in fotoStore.currentFotos"
           :key="foto.id" :src="`${serverBaseUrl}/storage/fotos/${foto.image_src}`"/>
    </div>
  </div>
  <Modal @click="()=>{selected = {}}" :opened="opened">
  <CrudButtons @click.stop :obj_to_edit="selected" @delete="()=>{selected = {}}" :delete_form="SimpleDeleteForm"  :delete_callback="del_func" :create_visible="false"></CrudButtons>
    <div @click.stop="" class="w-full text-center flex justify-center items-center">
      <Icon @click.stop="previousFoto" icon="ooui:previous-ltr"
            class="inline border-4 rounded-full hover:bg-gray-500 hover:bg-gradient-to-tl from-amber-600 to-yellow-400 hover:text-white p-2 w-20 h-20 min-h-5 font-bold text-black mr-4"/>
      <img class="inline w-3/4 h-5/6 cover rounded-lg" :src="`${serverBaseUrl}/storage/fotos/${selected.image_src}`"/>
      <Icon @click.stop="nextFoto" icon="ooui:next-ltr"
            class="inline border-4 rounded-full hover:bg-gray-500 hover:bg-gradient-to-tl from-amber-600 to-yellow-400 hover:text-white p-2 w-20 h-20 min-h-5 font-bold text-black ml-4"/>
    </div>
  </Modal>
</template>
