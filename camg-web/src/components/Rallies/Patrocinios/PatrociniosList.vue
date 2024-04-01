<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useRallyStore} from "@/stores/rally.js";

import Patrocinio from "@/components/Rallies/Patrocinios/Patrocinio.vue";
import {ref} from "vue";
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";


const patrocinioStore=usePatrocinioStore();
const rallyStore=useRallyStore();
const selectedPatrocinio = ref({});

</script>

<template>
  <div class="h-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Patrocinios</h1>

    <CrudButtons :edit_callback="patrocinioStore" :create_callback="patrocinioStore.createPatrocinio" :create_form="CreatePatrocinioForm" :obj_to_edit="selectedPatrocinio"></CrudButtons>
    <div class="w-full mx-auto loopple-min-height-78vh text-slate-500">
      <div class="flex flex-row justify-start">
        <div v-for="rally in rallyStore.rallies">
          <div class="mr-4">
            <a  class="uppercase rounded-lg bg-gray-100 border-b-2 border-amber-400 px-2 py-1 font-weight-400 hover:border-black hover:bg-gray-200 hover:font-bold">{{ rally.nome }}</a>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 removable mt-10">
        <Patrocinio v-for="patrocinio in patrocinioStore.patrocinios" :key="patrocinio.id" @click="selectedPatrocinio = patrocinio" :patrocinio="patrocinio" class="border-2 rounded-xl" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedPatrocinio.id==patrocinio.id}"></Patrocinio>
      </div>
    </div>
  </div>
</template>