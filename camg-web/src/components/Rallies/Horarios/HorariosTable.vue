<script setup>
import {ScheduleXCalendar} from '@schedule-x/vue'
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import {createEventModalPlugin} from '@schedule-x/event-modal'
import {createEventsServicePlugin} from '@schedule-x/events-service'
import {createDragAndDropPlugin} from '@schedule-x/drag-and-drop'
import '@schedule-x/theme-default/dist/index.css'
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
const current_id = ref(null);
const editing = ref(false);

const eventsServicePlugin = createEventsServicePlugin()
const calendar = createCalendar({
  views: [viewMonthGrid, viewWeek, viewDay],
  defaultView: viewWeek.name,
  events: events.value,
  callbacks: {
    onClickDateTime: ((e) => {
      current_creating_time.value = e;
      current_ending_time.value = new Date(e);
      current_ending_time.value.setHours(current_ending_time.value.getHours() + 1);
      current_ending_time.value = formatDate(current_ending_time.value);
    }),
    onClickDate: ((e) => {
      current_creating_time.value = e + " 00:00";
      current_ending_time.value = new Date(e);
      current_ending_time.value.setHours(current_ending_time.value.getHours() + 1);
      current_ending_time.value = formatDate(current_ending_time.value);
    }),
    onEventClick: ((e) => {
      editing.value = true;
      current_creating_time.value = e.start
      current_ending_time.value = e.end
      descricao.value = e.description
      titulo.value = e.title
      current_id.value = e.id
    }),
    onEventUpdate: ((e) => {
      current_creating_time.value = e.start
      current_ending_time.value = e.end
      descricao.value = e.description
      titulo.value = e.title
      current_id.value = e.id
      const data = {
        titulo: titulo.value,
        descricao: descricao.value,
        inicio: current_creating_time.value + ":00",
        fim: current_ending_time.value + ":00",
        id: current_id.value
      }
      horarioStore.updateHorario(data);
      current_creating_time.value = null;
      console.log(e)
    }),
  },
  plugins: [createEventModalPlugin(), eventsServicePlugin, createDragAndDropPlugin()]
})

watch(() => horarioStore.horariosScheduleFormat, () => {
  events.value = horarioStore.horariosScheduleFormat;
  eventsServicePlugin.set(events.value)
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
  const data = {
    titulo: titulo.value,
    descricao: descricao.value,
    inicio: current_creating_time.value + ":00",
    fim: current_ending_time.value + ":00",
    id: current_id.value
  }
  if (editing) {
    horarioStore.updateHorario(data);
    editing.value = false;
  } else {
    horarioStore.addHorario(data);
  }

  current_creating_time.value = null
}
</script>
<template>

  <div class="mt-2 mr-2 max-h-[80%] w-full h-full flex justify-center overflow-y-auto">
    <div class="w-[99%] h-full rounded-xl transition-all duration-200 max-h-full is-light-mode" id="panel">

      <ScheduleXCalendar :event-dragable="true" :calendar-app="calendar"/>
    </div>
  </div>
  <div class="">
    <SimpleModal :title="'as'" class="z-20 flex flex-wrap h-3/4" :opened="current_creating_time != null">
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
          <input @click="()=>{current_creating_time = null; editing = false}" type="reset"
                 class="w-5/12 text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-red-600 text-white"
                 value="Cancelar">
          <input @click.prevent="addHorario" type="submit"
                 class="w-5/12 text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-green-600 text-white"
                 :value="editing ? 'Atualizar' : 'Criar'">
        </div>
      </form>
    </SimpleModal>
  </div>
</template>
<style>
@import "qalendar/dist/style.css";
</style>
