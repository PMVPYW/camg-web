<script setup>
import {ref, watch, reactive} from "vue";

import {useProvaStore} from "@/stores/prova.js";
import Prova from "@/components/Rallies/Provas/Prova.vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import UpdateProvaForm from "@/components/Rallies/Provas/UpdateProvaForm.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import {useRallyStore} from "@/stores/rally.js";
import {Icon} from "@iconify/vue";


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
 <div v-if="rallyStore.rally_selected" class="w-full h-full rounded-xl transition-all duration-200 overflow-x-hidden" id="panel">
  <h1 class="text-2xl font-bold ml-10 mt-10">PECS</h1>
  <CrudButtons :create_visible="false" :create_form="UpdateProvaForm"
         :edit_callback="provaStore.editProva" :obj_to_edit="selectedProva"
         :delete_visible="false"
         @clearSelected="selectedProva = {}"></CrudButtons>
  <div class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
   <div class="flex bg-[#f8f9fe] justify-center w-full h-16">
    <div class="flex flex-wrap items-center justify-between w-5/6">
     <div class="flex flex-row w-2/6 m-4">
      <input type="text" required v-model="filters.search" class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500" placeholder="Procurar">
     </div>
     <div class="flex flex-row items-center m-4">
      <label class="block mx-4 text-base font-medium">Ordenar&nbsp;Por:</label>
      <select v-model="filters.order" class="font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500">
       <option value="nome_asc">Nome de A-Z</option>
       <option value="nome_desc">Nome de Z-A</option>
       <option value="local_asc">Local de A-Z</option>
       <option value="local_desc">Local de Z-A</option>
       <option value="distancia_percurso_asc">Distância Crescente</option>
       <option value="distancia_percurso_desc">Distância Decrescente</option>
       <option value="proximity">Proximidade</option>
      </select>
     </div>
    </div>
   </div>
  </div>
  <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
   <div class="flex flex-wrap -mx-3 removable mt-10 justify-center">
    <div class="w-9/12">
     <Prova v-for="prova in provaStore.provas_filtered" :key="prova.id" @click="()=>{selectedProva = prova}" :prova="prova" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedProva.id==prova.id}"></Prova>
    </div>
   </div>
  </div>
 </div>
 <div v-else class="mx-auto mt-12">
  <div class="flex flex-row items-center bg-gray-100 border border-amber-400 py-2 px-4 rounded-xl">
   <h1 class="text-gray-500 text-base font-medium">
    Não existem rallys, para ver as PECS de um rally terá que o criar primeiro!
   </h1>
   <div>
    <router-link :to="{ name: 'rallies' }" class="py-2.7 h-10 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors bg-white shadow-xl">
     <div class="bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1">
      <Icon icon="mdi:car-traction-control" class="min-w-5 min-h-5 text-white">
       <title>Criar Rally</title>
      </Icon>
     </div>
     <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">Criar Rally</span>
    </router-link>
   </div>
  </div>
 </div>
</template>