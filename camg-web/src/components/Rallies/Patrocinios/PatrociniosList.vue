<script setup>
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useRallyStore} from "@/stores/rally.js";

import Patrocinio from "@/components/Rallies/Patrocinios/Patrocinio.vue";
import {ref, watch} from "vue";
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";
import EditPatrocinioForm from "@/components/Rallies/Patrocinios/EditPatrocinioForm.vue";
import {Icon} from "@iconify/vue";


const patrocinioStore=usePatrocinioStore();
const rallyStore=useRallyStore();
const selectedPatrocinio = ref({});

let associating = ref(false);
let editing = ref(false);

const order_by = ref("rel_desc");

const filteredSponsors = ref(patrocinioStore.patrocinios);
const pesquisa= ref(null)



function searchEntities() {
 const regex = new RegExp(pesquisa.value, 'i');
 const patrocinios = patrocinioStore.patrocinios;
 filteredSponsors.value = patrocinios.filter(entity => regex.test(entity.entidade_id.nome));
 console.log(filteredSponsors);
}


//filters
watch(order_by, (new_value) => {
 patrocinioStore.loadPatrocinios({filters:order_by.value})
 filteredSponsors.value = patrocinioStore.patrocinios
})


watch(()=>patrocinioStore.patrocinios, (patrocinio)=>{
 filteredSponsors.value=patrocinioStore.patrocinios;
});


</script>

<template>
 <div v-if="rallyStore.rally_selected" class="h-full w-full rounded-xl transition-all duration-200 overflow-x-hidden" id="panel">
  <h1 class="text-2xl font-bold ml-10 mt-10 w-full">Patrocinios</h1>
  <div class="flex w-11/12 mx-auto mt-16 rounded-lg justify-center bg-[#f8f9fe]">
    <div v-if="editing === false && associating === false" class="flex flex-col bg-[#f8f9fe] w-full h-16 justify-center">
     <div class="flex flex-row items-center justify-center w-full my-10">
      <button @click="()=>{associating=true; selectedPatrocinio=!selectedPatrocinio;console.log(associating)}" type="button"
          class="md:w-3/12 sm:w-full text-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-600 bg-green-800 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600 justify-center">
       Adicionar
      </button>
      <button @click="()=>{selectedPatrocinio.id ?patrocinioStore.desassociarPatrocinio(selectedPatrocinio.id):''}" type="button" :disabled="!selectedPatrocinio.id"
          class="md:w-3/12 sm:w-full justify-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-red-800 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
      Eliminar
      </button>
      <button @click="()=>{!selectedPatrocinio.id ? editing = false : editing = true}" type="button" :disabled="!selectedPatrocinio.id"
          class="md:w-3/12 sm:w-full justify-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-slate-900 text-white shadow-sm disabled:opacity-50 disabled:pointer-events-none hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
       Editar
      </button>
     </div>
     <div class="flex flex-row flex-wrap items-center justify-center w-full">
      <div class="flex flex-row mx-4 w-2/6 min-w-40 mb-2">
       <input type="text" required v-model="pesquisa" @input="searchEntities" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Procurar">
      </div>
      <div class="flex flex-row items-center mb-2">
       <label class="block mx-4 text-base font-medium">Ordenar&nbsp;Por:</label>
       <select v-model="order_by" class="font-bold py-3 px-4 w-46 block text-slate-700 bg-gray-100 rounded-lg text-xs border-b-2 h-10 border-amber-400">
        <option value="nome_asc">Nome Z-A</option>
        <option value="nome_desc">Nome A-Z</option>
        <option value="rel_desc">Mais relevante</option>
        <option value="rel_asc">Menos relevante</option>
       </select>
      </div>
     </div>
    </div>
   <!--Create Form-->
   <div v-if="associating === true" class="w-full">
     <button @click="()=>{associating=false}" type="button" class="text-gray-400 font-bold text-lg mb-4 mt-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
       <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
     </button>
    <CreatePatrocinioForm></CreatePatrocinioForm>
    <hr class="mt-5 mb-10">
   </div>
   <!--Edit Form-->
   <div v-if="editing === true" class="w-full">
    <button @click="()=>{editing=false}" type="button" class="text-gray-400 font-bold text-lg mb-4 mt-2">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
     </svg>
    </button>
    <EditPatrocinioForm :obj_to_edit="selectedPatrocinio"></EditPatrocinioForm>
    <hr class="mt-5 mb-10">
   </div>
  </div>
  <div class="w-11/12 mx-auto loopple-min-height-78vh text-slate-500">
   <div class="flex flex-wrap -mx-3 removable mt-20">
     <Patrocinio v-for="patrocinio in filteredSponsors" :key="patrocinio.id" @click="()=>{selectedPatrocinio = patrocinio}" :patrocinio="patrocinio" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedPatrocinio.id==patrocinio.id}"></Patrocinio>
   </div>
  </div>
 </div>
 <div v-else class="mx-auto mt-12">
  <div class="flex flex-row items-center bg-gray-100 border border-amber-400 py-2 px-4 rounded-xl">
   <h1 class="text-gray-500 text-base font-medium">
    Não existem rallys, para ver os patrocinios de um rally terá que o criar primeiro!
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