<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";

import { reactive, ref, watch } from "vue";
import DeleteRallyForm from "@/components/common/SimpleDeleteForm.vue";
import { useAlbumStore } from "@/stores/album.js";
import Album from "@/components/Albuns/Album.vue";
import CreateAlbumForm from "@/components/Albuns/createAlbumForm.vue";
import { useRallyStore } from "@/stores/rally.js";

const albumStore = useAlbumStore();
const rallyStore = useRallyStore();
const selectedAlbum = ref({});

const filters = reactive({ search: "", rally_id: "todos" });

watch(filters, (n_filters) => {
  albumStore.loadAlbuns(filters);
});

const setSelectedAlbum = (rally) => {
  if (selectedAlbum.value.id != rally.id) {
    selectedAlbum.value = rally;
  } else {
    selectedAlbum.value = {};
  }
};
</script>

<template>
  <CrudButtons
    :create_callback="albumStore.createAlbum"
    :create_form="CreateAlbumForm"
    :edit_callback="albumStore.updateAlbum"
    :delete_callback="albumStore.deleteAlbum"
    :delete_form="DeleteRallyForm"
    :obj_to_edit="selectedAlbum"
    @clearSelected="selectedAlbum = {}"
  ></CrudButtons>

  <div class="w-11/12 my-8 h-full rounded-lg justify-center mx-auto p-4">
    <!--filters-->
    <div class="mx-auto h-1/4 w-full p-3 mb-6 sm:flex-none">
      <input
        type="text"
        placeholder="Pesquisar"
        v-model.lazy="filters.search"
        class="w-11/12 lg:w-1/2 text-sm m-2 py-3 px-4 text-center bg-gray-100 rounded-lg border border-amber-200 focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
      />
      <label
        class="h-10 my-2 ml-2 p-2 font-medium text-center rounded-lg w-1/12"
        >Rally:</label
      >
      <select
        class="w-11/12 lg:w-5/12 text-sm m-2 py-3 px-4 text-center font-bold capitalize bg-gray-100 rounded-lg border border-amber-200 focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
        v-model="filters.rally_id"
      >
        <option value="todos">Todos</option>
        <option value="nenhum">Sem Rally</option>
        <option v-for="rally in rallyStore.rallies" :value="rally.id">
          {{ rally.nome }}
        </option>
      </select>
    </div>
    <!--End-Of-filters-->
    <TransitionGroup name="list">
      <Album
        v-for="album in albumStore.albuns"
        :key="album.id"
        @click="() => setSelectedAlbum(album)"
        :album="album"
        class="border-2 rounded-xl"
        :class="{
          'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]':
            selectedAlbum.id == album.id,
        }"
      ></Album>
    </TransitionGroup>
  </div>
</template>
<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
