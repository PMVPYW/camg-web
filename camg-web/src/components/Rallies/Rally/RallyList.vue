<script setup>

import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";
import Rally from "@/components/Rallies/Rally/Rally.vue";
import {useRallyStore} from "@/stores/rally.js";
import {reactive, ref, watch} from "vue";

const rallyStore = useRallyStore();
const selectedRally = ref({});

//filters
const filters = reactive({search: "", data_inicio: '', data_fim: '', order: 'proximity', status: 'all'})

watch(filters, (new_value) => {
  console.log(new_value)
  alert("#TODO! -- implement search filter!")
})

const setSelectedRally = (rally) => {
  if (selectedRally.value.id != rally.id) {
    selectedRally.value = rally
  } else {
    selectedRally.value = {}
  }

}


</script>

<template>
  <CrudButtons :create_callback="rallyStore.createRally" :create_form="CreateRallyForm"
               :edit_callback="rallyStore.updateRally" :delete_callback="rallyStore.deleteRally"
               :obj_to_edit="selectedRally"
               @clearSelected="selectedRally = {}"></CrudButtons>
  <div class="border-4 w-11/12 my-8 h-full rounded-lg justify-center mx-auto bg-[#f8f9fe] p-4">
    <div class="m-2 w-11/12 bg-white border-4 mx-auto rounded-lg text-center">
      <input type="text" placeholder="Pesquisar" v-model.lazy="filters.search"
             class="w-11/12 lg:w-1/2 bg-[#f8f9fe] m-2 rounded-md text-black  text-center border-2 h-10">
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12">De</label>
      <input type="date" placeholder="data inicio" required
             v-model="filters.data_inicio"
             class="h-10 my-2 ml-2 p-2 font-bold text-center border-2 rounded-lg w-11/12 lg:w-1/6 bg-[#f8f9fe]">
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12">Até</label>
      <input type="date" placeholder="data fim" required
             v-model="filters.data_fim"
             class="h-10 my-2 ml-2 p-2 font-bold text-center border-2 rounded-lg w-11/12 lg:w-1/6 bg-[#f8f9fe]">

      <br>
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12">Ordenar</label>
      <select
          v-model="filters.order"
          class="h-10 my-2 ml-2 p-2 font-bold text-center border-2 rounded-lg w-11/12 lg:w-1/6 bg-[#f8f9fe]">
        <option value="proximity">Por proximidade</option>
        <option value="date_desc">Por data decrescente</option>
        <option value="date_asc">Por data crescente</option>
      </select>
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12">Status</label>
      <select
          v-model="filters.status"
          class="h-10 my-2 ml-2 p-2 font-bold text-center border-2 rounded-lg w-11/12 lg:w-1/6 bg-[#f8f9fe]">
        <option value="all">Todos</option>
        <option value="not_started">Por iniciar</option>
        <option value="on_going">A decorrer</option>
        <option value="terminated">Terminado</option>
      </select>
    </div>

    <Rally v-for="rally in rallyStore.rallies" :key="rally.id" @click="()=>setSelectedRally(rally)" :rally="rally"
           class="border-2 rounded-xl"
           :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedRally.id==rally.id}"></Rally>
  </div>
</template>
