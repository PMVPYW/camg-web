<script setup>

import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";

import {ref} from "vue";
import DeleteRallyForm from "@/components/Rallies/Rally/DeleteRallyForm.vue";
import {useAlbumStore} from "@/stores/album.js";
import Album from "@/components/Albuns/Album.vue";

const albumStore = useAlbumStore();
const selectedAlbum = ref({});


const setSelectedAlbum = (rally) => {
  if (selectedAlbum.value.id != rally.id) {
    selectedAlbum.value = rally
  } else {
    selectedAlbum.value = {}
  }

}


</script>

<template>
  <CrudButtons :create_callback="albumStore.createAlbum" :create_form="CreateRallyForm"
               :edit_callback="albumStore.updateAlbum" :delete_callback="albumStore.deleteAlbum"
               :delete_form="DeleteRallyForm"
               :obj_to_edit="selectedAlbum"
               @clearSelected="selectedAlbum = {}"></CrudButtons>
  <div class="border-4 w-11/12 my-8 h-full rounded-lg justify-center mx-auto bg-[#f8f9fe] p-4">
    <Album v-for="album in albumStore.albuns" :key="album.id" @click="()=>setSelectedAlbum(album)" :album="album"
           class="border-2 rounded-xl"
           :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedAlbum.id==album.id}"></Album>
  </div>
</template>
