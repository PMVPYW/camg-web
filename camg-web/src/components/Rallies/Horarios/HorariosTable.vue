<script setup>
import {Qalendar} from "qalendar";
import {ref, watch} from "vue";
import {useHorarioStore} from "@/stores/horario.js";
import SimpleModal from "@/components/common/SimpleModal.vue";

const horarioStore = useHorarioStore();
console.log("icd", horarioStore.horariosScheduleFormat)
const events = ref(horarioStore.horariosScheduleFormat)

const current_creating_time = ref(null);
const current_ending_time = ref(null);
const titulo = ref("");
const descricao = ref("");

watch(() => horarioStore.horariosScheduleFormat, () => {
  events.value = horarioStore.horariosScheduleFormat;
})

function formatDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function addHorario() {
  horarioStore.addHorario({
    titulo: titulo.value,
    descricao: descricao.value,
    inicio: current_creating_time.value + ":00",
    fim: current_ending_time.value + ":00",
    id: 12
  });
  current_creating_time.value = null
}
</script>
<template>

  <div class="mt-2 mr-2 max-h-[80%] w-full h-full flex justify-center overflow-y-auto">
    <div class="w-[99%] h-full rounded-xl transition-all duration-200 max-h-full is-light-mode" id="panel">

      <Qalendar class="w-11/12 mx-auto my-4" @edit-event="(e)=>console.log(e)" :options="{locale: 'pt-EU'}"
                :is-loading="horarioStore.horarios == null"
                @datetime-was-clicked="(e)=>{current_creating_time = e; current_ending_time = new Date(e); current_ending_time.setHours(current_ending_time.getHours()+1); current_ending_time = formatDate(current_ending_time); console.log(current_ending_time, current_creating_time, typeof(current_ending_time) == typeof (current_creating_time))}"
                :events="horarioStore.horariosScheduleFormat">
      </Qalendar>
    </div>
  </div>
  <div class="">
    <SimpleModal :title="'as'" class="flex flex-wrap h-3/4" :opened="current_creating_time != null">
      <form class="w-full h-3/4 border-4">
        <div class="w-full">
          <label for="titulo" class="font-bold ml-2 mt-2">Titulo</label><br>
          <input type="text" name="titulo" placeholder="Titulo" required v-model="titulo"
                 class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-1/2">
        </div>
        <div class="w-full flex flex-col items-center justify-center">
          <label for="descricao" class="font-bold ml-2 mt-2">Descrição</label><br>
          <textarea type="text" name="descricao" placeholder="Descrição" required v-model="descricao"
                    class="text-sm my-2 ml-2 p-2 border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-[99%] h-16"></textarea>
        </div>
        <div class="w-full flex flex-row">
          <div class="flex flex-col justify-center items-center text-start w-1/2 mx-auto">
            <label for="titulo" class="font-bold w-11/12 ml-2 mt-2">Inicio</label><br>
            <input type="datetime-local" v-model="current_creating_time"
                   class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-11/12">
          </div>
          <div class=" w-1/2 flex flex-col justify-center items-center text-start">
            <label for="titulo" class="font-bold w-11/12 ml-2 mt-2">Fim</label><br>
            <input type="datetime-local" v-model="current_ending_time"
                   class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-11/12">
          </div>
        </div>
        <div class="flex flex-row items-center justify-center text-start w-11/12 mx-auto">
          <input @click="()=>{current_creating_time = null}" type="reset"
                 class="w-5/12 text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-red-600 text-white"
                 value="Cancelar">
          <input @click.prevent="addHorario" type="submit"
                 class="w-5/12 text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white"
                 value="Criar">
        </div>
      </form>
    </SimpleModal>
  </div>
</template>
<style>
@import "qalendar/dist/style.css";
</style>
