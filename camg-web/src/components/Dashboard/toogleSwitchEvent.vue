<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
 import AnimatedNumber from './AnimatedNumber.vue'


const props = defineProps({opcao1: {default: "Evento1"}, opcao2: {default: "Evento2"}, ev1: {default: null}, ev2: {default: null}});
const emits = defineEmits(["renew"]);

const selected = ref(0);

const current = ref(props.ev1);
const event = ref(new Date(props.ev1.inicio));
const time_left = ref(Math.abs(Date.now() - new Date(props.ev1.inicio)));
const formated_result = ref("NA")

var interval;

function updateTimer() {
 if (selected.value == 0)
  {
   time_left.value = event.value - new Date(Date.now())
  } else {
   time_left.value = time_left.value = new Date(Date.now()) - event.value
  }
  time_left.value/= 1000;
  if (time_left.value <= 0 && selected.value == 0)
  {
   emits("renew");
  } else {
   if (time_left.value < 0)
   {
    formated_result.value = "A decorrer até: " + current.value.fim;
    return;
   }
   let days = Math.floor(time_left.value / (60*60*24));
   let hours = Math.floor((time_left.value % (24 * 60 * 60)) / (60 * 60));
   let minutes = Math.floor((time_left.value % (60 * 60)) / 60);
   let seconds = Math.floor(time_left.value % 60);
   formated_result.value = `${days}:${hours}:${minutes}:${seconds}`
  }

}

function setCurrent(){
 if (selected.value == 0)
 {
  current.value = {...props.ev1};
  event.value = new Date(props.ev1?.inicio).getTime()
  time_left.value = event.value - Date.now()
 } else {
  current.value = {...props.ev2};
  event.value = new Date(props.ev2?.fim).getTime()
  time_left.value = Date.now() - event.value
 }
 if (Object.keys(current.value).length == 0)
 {
  current.value = null;
 }
 if (current.value == null)
 {
  clearInterval(interval);
  formated_result.value = "NA"
 } else {
  updateTimer();
 }
}

watch(props, setCurrent , {deep: true});

watch(selected, setCurrent)

onMounted(()=>{
 interval = setInterval(updateTimer, 1000);
})

onUnmounted(()=>{
 clearInterval(interval);
})


</script>
<template>
  <div class="w-3/4 h-8 m-2 rounded-lg mx-auto flex justify-center items-center">
    <button class="w-1/2 h-full border-r-2 rounded-l-lg text-white text-sm" :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl' : selected == 0, 'bg-gray-500' : selected != 0}" @click="()=>{selected = 0}">{{ props.opcao1 }}</button>
    <button class="w-1/2 h-full border-l-2 rounded-r-lg text-white text-sm" :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl' : selected == 1, 'bg-gray-500' : selected != 1}" @click="()=>{selected = 1}">{{ props.opcao2 }}</button>
  </div>
  <div class="w-11/12 h-32 mx-auto flex items-center justify-center">
    <div class="w-full h-full flex flex-wrap items-center justify-center text-xl">
     <div v-if="current != null" class="w-full h-full mx-auto text-center flex flex-col items-center justify-center">
       <h1 class="text-2xl">{{ current.titulo }}</h1>
       {{ formated_result }}
     </div>
     <div v-else><h1>Não existe um evento</h1></div>
    </div>
  </div>
</template>