<script setup>
import Noticia from "@/components/Noticias/Noticia.vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import CreateHistoriaForm from "@/components/Historias/CreateHistoriaForm.vue";
import DeleteHistoriaForm from "@/components/Historias/DeleteHistoriaForm.vue";
import {ref} from "vue";
import Historia from "@/components/Historias/Historia.vue";
import {useHistoriaStore} from "@/stores/historia.js";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";

const historiaStore = useHistoriaStore();
const selectedHistoria = ref(false);
</script>
<template>
  <div class="w-full h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">História</h1>
    <CrudButtons :create_callback="historiaStore.createHistoria" :create_form="CreateHistoriaForm"
                 :edit_callback="historiaStore.editHistoria" :obj_to_edit="selectedHistoria"
                 :delete_callback="historiaStore.deleteHistoria" :delete_form="SimpleDeleteForm"
                 @clearSelected="selectedHistoria = {}"></CrudButtons>
    <div  class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
        <div class="flex flex-row flex-wrap items-center justify-between w-5/6">
          <div class="flex flex-row w-2/6 w-min-16 my-1">
            <input type="text" required class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <div class="flex flex-row items-center my-1">
            <label class="block mx-4 text-base font-medium">Ordenar:</label>
            <select class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="titulo_asc">A-Z</option>
              <option class="uppercase" value="titulo_desc">Z-a</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10 h-screen overflow-y-auto">
        <Historia v-for="historia in historiaStore.historias_filtered" :key="historia.id" @click="()=>{selectedHistoria = historia}" :historia="historia" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedHistoria.id==historia.id}"></Historia>
      </div>
    </div>
  </div>
</template>
