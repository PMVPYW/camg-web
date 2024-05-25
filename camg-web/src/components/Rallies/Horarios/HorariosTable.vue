<script setup>
import {ScheduleXCalendar} from '@schedule-x/vue'
import {
  createCalendar,
  viewDay,
  viewWeek,
  viewMonthGrid,
  viewMonthAgenda,
} from '@schedule-x/calendar'
import {createEventsServicePlugin} from '@schedule-x/events-service'
import {createDragAndDropPlugin} from '@schedule-x/drag-and-drop'
import {createCalendarControlsPlugin} from '@schedule-x/calendar-controls'
import {createResizePlugin} from '@schedule-x/resize'
import '@schedule-x/theme-default/dist/index.css'
import {ref, watch} from "vue";
import {useHorarioStore} from "@/stores/horario.js";
import SimpleModal from "@/components/common/SimpleModal.vue";
import {useRallyStore} from "@/stores/rally.js";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";
import {Icon} from "@iconify/vue";
import {useProvaStore} from "@/stores/prova.js";

const rallyStore = useRallyStore();
const provaStore = useProvaStore();
const horarioStore = useHorarioStore();
//var current_rally_date = rallyStore.rallies.find((item) => item.id == rallyStore.rally_selected).data_inicio.split('-')
//const current_date = ref(new Date(Date.parse(`${current_rally_date[0]}-${current_rally_date[1]}-${current_rally_date[2]}`)));
const events = ref(horarioStore.horariosScheduleFormat)

const current_creating_time = ref(null);
const current_ending_time = ref(null);
const titulo = ref("");
const descricao = ref("");
const prova_id = ref(null);
const current_id = ref(null);
const editing = ref(false);
const deleting = ref(false);

const eventsServicePlugin = createEventsServicePlugin()
const calendarControls = createCalendarControlsPlugin()
const calendar = createCalendar({
  views: [viewMonthGrid, viewWeek, viewDay],
  defaultView: viewWeek.name,
  events: events.value,
  calendars: {
    prova: {
      colorName: 'prova',
      lightColors: {
        main: '#D69708',
        container: '#F3C978',
        onContainer: '#4B2E00',
      },
      darkColors: {
        main: '#D69708',
        container: '#F3C978',
        onContainer: '#4B2E00',
      },
    }
  },
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
      prova_id.value = e.prova.id
    }),
    onEventUpdate: ((e) => {
      current_creating_time.value = e.start
      current_ending_time.value = e.end
      descricao.value = e.description
      titulo.value = e.title
      current_id.value = e.id
      prova_id.value = e.prova.id
      const data = {
        titulo: titulo.value,
        descricao: descricao.value,
        inicio: current_creating_time.value + ":00",
        fim: current_ending_time.value + ":00",
        id: current_id.value,
        prova_id: prova_id
      }
      horarioStore.updateHorario(data);
      current_creating_time.value = null;
      console.log(e)
    }),
  },
  plugins: [eventsServicePlugin, createDragAndDropPlugin(), calendarControls, createResizePlugin()]
})

watch(() => rallyStore.rally_selected, () => {
  calendarControls.setDate(rallyStore.rallies.find((item) => item.id == rallyStore.rally_selected).data_inicio)
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

const clearVars = () => {
  titulo.value = null;
  descricao.value = null
  current_creating_time.value = null;
  current_ending_time.value = null;
  current_id.value = null;
  prova_id.value = null;
}

function addHorario() {
  const form = document.getElementById("form")
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = {
    titulo: titulo.value,
    descricao: descricao.value,
    inicio: current_creating_time.value + ":00",
    fim: current_ending_time.value + ":00",
    id: current_id.value
  }
  if (prova_id.value != null) {
    data["prova_id"] = prova_id.value
  }
  if (editing.value) {
    horarioStore.updateHorario(data);
    editing.value = false;
  } else {
    horarioStore.addHorario(data);
  }

  clearVars();
}
</script>
<template>

  <div class="mt-2 mr-2 max-h-[80%] w-full h-full flex justify-center overflow-y-auto">
    <div class="w-[99%] rounded-xl transition-all duration-200 h-dvh max-h-full is-light-mode overflow-hidden" id="panel">
      <ScheduleXCalendar class="max-h-dvh w-11/12 h-[98%] mx-auto my-4 rounded-lg border-2" :event-dragable="true" :calendar-app="calendar"/>
    </div>
  </div>
  <div class="">
    <SimpleModal @close-modal="clearVars" @click="clearVars" :title="'as'" class="z-20 flex flex-wrap h-3/4"
                 :opened="current_creating_time != null">
      <form @click.stop="" id="form" class="w-full h-3/4 border-4">
        <div class="w-full flex flex-row">
          <div class="flex flex-col justify-center w-1/2 m-2">
            <label for="titulo" class="font-bold ml-2 mt-2">Titulo</label><br>
            <input type="text" name="titulo" placeholder="Titulo" required v-model="titulo"
                   class="text-sm h-10 p-2 w-full text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>
          <div class="flex flex-col justify-center w-1/2">
            <label for="prova" class="font-bold ml-2 mt-2">Prova</label><br>
            <select v-model="prova_id" class="font-bold h-10 p-2 w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
              <option :selected="prova_id===null"></option>
              <option class="uppercase" v-for="prova in provaStore.provas" :value="prova.id">{{ prova.nome }}
              </option>
            </select>
          </div>
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
        <div v-if="editing" class="flex flex-row items-center justify-center text-start w-11/12 mx-auto">
          <input @click.prevent="(e)=>{current_creating_time = null; editing = false; deleting = true;}" type="reset"
                 class="w-10/12 font-bold text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-red-600 text-white"
                 value="Eliminar">
        </div>
      </form>
    </SimpleModal>
    <div v-if="deleting"
         class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <SimpleDeleteForm :bg="'white'" :obj_to_delete="{nome:titulo}"
                        @delete="()=>{horarioStore.deleteHorario(current_id); deleting = false}"
                        @cancel="()=>deleting=false"/>
    </div>

  </div>
</template>
<style>
@import "qalendar/dist/style.css";
</style>
