<script setup>
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useRallyStore} from "@/stores/rally.js";

import Patrocinio from "@/components/Rallies/Patrocinios/Patrocinio.vue";
import {ref} from "vue";
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";
import EditPatrocinioForm from "@/components/Rallies/Patrocinios/EditPatrocinioForm.vue";


const patrocinioStore=usePatrocinioStore();
const rallyStore=useRallyStore();
const selectedPatrocinio = ref({});


const associating = ref(false);
const editing = ref(false);
const deleting = ref(false);

</script>

<template>
  <div class="h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Patrocinios</h1>
    <div  class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
      <div v-if="editing === false || associating === false" class="flex justify-center mx-auto bg-[#f8f9fe] w-full h-16 ">
        <button @click="()=>{associating=!associating; selectedPatrocinio=!selectedPatrocinio}" type="button"
                class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Adicionar
        </button>
        <button @click="()=>{editing=!editing}" type="button"
                class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Editar
        </button>
        <button @click="()=>{patrocinioStore.desassociarPatrocinio(selectedPatrocinio.id)}" type="button"
                class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Eliminar
        </button>
      </div>
      <!--Create Form-->
      <div v-if="associating">
          <button @click="()=>{associating=!associating}" type="button" class="text-gray-400 font-bold text-lg mb-4 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
        <CreatePatrocinioForm></CreatePatrocinioForm>
        <hr class="mt-5 mb-10">
      </div>
      <!--Edit Form-->
      <div v-if="editing">
        <button @click="()=>{editing=!editing}" type="button" class="text-gray-400 font-bold text-lg mb-4 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <EditPatrocinioForm :obj_to_edit="selectedPatrocinio"></EditPatrocinioForm>
        <hr class="mt-5 mb-10">
      </div>
    </div>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-wrap -mx-3 removable mt-10">
          <Patrocinio v-for="patrocinio in patrocinioStore.patrocinios" :key="patrocinio.id" @click="()=>{selectedPatrocinio = patrocinio}" :patrocinio="patrocinio" class="border-2 rounded-xl w-full" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedPatrocinio.id==patrocinio.id}"></Patrocinio>
      </div>
    </div>
  </div>
</template>