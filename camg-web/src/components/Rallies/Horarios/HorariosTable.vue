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
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import '@schedule-x/theme-default/dist/index.css'
import {onMounted, ref, watch} from "vue";
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
console.log("events", events)
const current_creating_time = ref(null);
const current_ending_time = ref(null);
const titulo = ref("");
const descricao = ref("");
const prova_id = ref(false);
const current_id = ref(null);
const editing = ref(false);
const deleting = ref(false);

const eventsServicePlugin = createEventsServicePlugin()
const calendarControls = createCalendarControlsPlugin()
const calendar = createCalendar({
  views: [viewMonthGrid, viewWeek, viewDay],
  defaultView: viewWeek.name,
  events: events.value,
  selectedDate: rallyStore.rallies.find((item) => item.id == rallyStore.rally_selected).data_inicio,
  calendars: {
    evento: {
      colorName: 'evento',
      lightColors: {
        main: '#D69708',
        container: '#7a7d7d',
        onContainer: '#fff',
      },
      darkColors: {
        main: '#D69708',
        container: '#5F7470',
        onContainer: '#fff',
      }
    },
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
      clearVars();
      current_creating_time.value = e;
      current_ending_time.value = new Date(e);
      current_ending_time.value.setHours(current_ending_time.value.getHours() + 1);
      current_ending_time.value = formatDate(current_ending_time.value);
    }),
    onClickDate: ((e) => {
      clearVars();
      current_creating_time.value = e + " 00:00";
      current_ending_time.value = new Date(e);
      current_ending_time.value.setHours(current_ending_time.value.getHours() + 1);
      current_ending_time.value = formatDate(current_ending_time.value);
    }),
    onEventClick: ((e) => {
      clearVars();
      editing.value = true;
      current_creating_time.value = e.start
      current_ending_time.value = e.end
      descricao.value = e.description
      titulo.value = e.title.split('-')[0];
      current_id.value = e.id
      
      const data = horarioStore.horarios.find((item)=>item.id == e.id);
      if (data)
      {
          prova_id.value = data.prova?.id
      }
      console.error(e)
    }),
    onEventUpdate: ((e) => {
      current_creating_time.value = e.start
      current_ending_time.value = e.end
      descricao.value = e.description
      titulo.value = e.title.split('-')[0];
      current_id.value = e.id
      if (prova_id.value !== false) {
        prova_id.value = e.prova?.id
      }
      const data = {
        titulo: titulo.value,
        descricao: descricao.value,
        inicio: current_creating_time.value + ":00",
        fim: current_ending_time.value + ":00",
        id: current_id.value
      }
      if (prova_id.value !== false) {
        data["prova_id"] = prova_id.value
      }
      console.log("UPDATE", data)
      horarioStore.updateHorario(data);
      current_creating_time.value = null;
      console.log(e)
    }),
  },
  plugins: [eventsServicePlugin, createDragAndDropPlugin(), calendarControls, createResizePlugin(), createCurrentTimePlugin()]
})

watch(() => rallyStore.rally_selected, () => {
 calendarControls.setDate(rallyStore.rallies.find((item) => item.id == rallyStore.rally_selected).data_inicio)
})


watch(() => horarioStore.horariosScheduleFormat, () => {
  events.value = horarioStore.horariosScheduleFormat;
  eventsServicePlugin.set(events.value)
}, {deep: true})

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
 prova_id.value = false;
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
 if (prova_id.value !== false) {
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
   <form @click.stop="" id="form" class="w-full h-3/4 flex flex-col items-center">
     <div class="w-10/12">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
       <div class="flex flex-col justify-center">
         <label class="block mb-2 text-base font-medium">Título<label class="text-red-600 ml-1">*</label></label>
        <input type="text" name="titulo" placeholder="Título do Evento" required v-model="titulo"
            class="text-sm py-3 px-4 w-full text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none">
       </div>
       <div class="flex flex-col justify-center">
         <label class="block mb-2 text-base font-medium">Prova</label>
        <select v-model="prova_id" class="font-bold py-3 px-4 w-full border border-amber-200 bg-gray-100 rounded-lg text-sm">
         <option :selected="prova_id===null"></option>
         <option class="uppercase" v-for="prova in provaStore.provas" :disabled="prova.horario" :value="prova.id">{{ prova.nome }}
         </option>
        </select>
       </div>
      </div>
     <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full mt-4">
       <div class="flex flex-col justify-center">
         <label class="block mb-2 text-base font-medium">Data de Início<label class="text-red-600 ml-1">*</label></label>
         <input type="datetime-local" v-model="current_creating_time"
                class="text-sm py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none">
       </div>
       <div class="flex flex-col justify-center">
         <label class="block mb-2 text-base font-medium">Data de Fim<label class="text-red-600 ml-1">*</label></label>
         <input type="datetime-local" v-model="current_ending_time"
                class="text-sm py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none">
       </div>
       </div>
      <div class="w-full flex flex-col justify-center mt-4">
        <label class="block mb-2 text-base font-medium">Descrição<label class="text-red-600 ml-1">*</label></label>
       <textarea type="text" name="descricao" placeholder="Descrição do Evento" required v-model="descricao"
            class="text-sm w-full py-3 px-4 border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"></textarea>
      </div>
   </div>
     <div class="w-10/12 mx-auto my-4">
       <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
     </div>
    <div class="flex flex-row items-center justify-center text-start w-11/12 mx-auto mt-10">
     <input @click="()=>{current_creating_time = null; editing = false}" type="reset"
         class="opacity-85 w-4/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-red-800 border-red-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
         value="Fechar">
     <input @click.prevent="addHorario" type="submit"
         class="opacity-85 w-4/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
         :value="editing ? 'Atualizar' : 'Criar'">
    </div>
    <div v-if="editing" class="flex flex-row items-center justify-center text-start w-11/12 mx-auto">
     <input @click.prevent="(e)=>{current_creating_time = null; editing = false; deleting = true;}" type="reset"
         class="opacity-85 w-9/12 mt-4 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-red-800 border-red-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
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
