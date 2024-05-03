<script setup>
import {ref, watch, reactive} from "vue";

import {useProvaStore} from "@/stores/prova.js";
import Prova from "@/components/Rallies/Provas/Prova.vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import UpdateProvaForm from "@/components/Rallies/Provas/UpdateProvaForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import {useRallyStore} from "@/stores/rally.js";


//Stores
const provaStore=useProvaStore();
const rallyStore=useRallyStore();
const selectedProva= ref({});

//filters
const filters = reactive({order: 'nome_asc', data_inicio: '', search: ''})

watch(filters, (new_value) => {
  provaStore.loadProvas({filters: filters})
})


</script>
<template>
  <div class="w-full h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Provas</h1>
    <CrudButtons :create_visible="false" :create_form="UpdateProvaForm"
                 :edit_callback="provaStore.editProva" :obj_to_edit="selectedProva"
                 :delete_callback="provaStore.deleteProva" :delete_form="SimpleDeleteForm"
                 @clearSelected="selectedProva = {}"></CrudButtons>
    <div  class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
        <div class="flex flex-row items-center justify-between w-5/6">
          <div class="flex flex-row w-2/6">
            <input type="text" required v-model="filters.search" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
          </div>
          <div class="flex flex-row items-center">
            <label class="block mx-4 text-base font-medium">Ordenar:</label>
            <select v-model="filters.order" class="uppercase font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option class="uppercase" value="nome_asc">Nome A-Z</option>
              <option class="uppercase" value="nome_desc">Nome Z-A</option>
              <option class="uppercase" value="local_asc">Local A-Z</option>
              <option class="uppercase" value="local_desc">Local Z-a</option>
              <option class="uppercase" value="distancia_percurso_asc">Distancia crescente</option>
              <option class="uppercase" value="distancia_percurso_desc">Distancia decrescente</option>
              <option class="uppercase" value="proximity">Proximidade</option>
            </select>
          </div>
          <div class="flex flex-row items-center">
            <label class="block ml-4 text-base font-medium w-9/12">A partir de:</label>
            <input v-model="filters.data_inicio" type="date" class="py-3 px-8 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm ">
          </div>
        </div>
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10 justify-center">
        <div v-for="prova in provaStore.provas_filtered" class="w-9/12">
          <Prova v-if="prova.rally_id===rallyStore.rally_selected" :key="prova.id" @click="()=>{selectedProva = prova}" :prova="prova" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedProva.id==prova.id}"></Prova>
        </div>
      </div>
    </div>
  </div>
</template>