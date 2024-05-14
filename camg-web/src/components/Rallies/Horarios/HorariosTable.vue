<script setup>
import {Qalendar} from "qalendar";
import {ref, watch} from "vue";
import {useHorarioStore} from "@/stores/horario.js";
const horarioStore = useHorarioStore();
console.log("icd", horarioStore.horariosScheduleFormat)
const events = ref([
  // ...
  {
    title: "Advanced algebra",
    with: "Chandler Bing",
    time: { start: "2024-05-14 12:05", end: "2024-05-14 12:35" },
    color: "yellow",
    isEditable: true,
    id: "753944708f0f",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
  },
  {
    title: "Ralph on holiday",
    with: "Rachel Greene",
    time: { start: "2024-05-14 12:04", end: "2024-05-15 12:35" },
    color: "green",
    isEditable: true,
    id: "5602b6f589fc"
  }
  // ...
])

events.value = horarioStore.horariosScheduleFormat;
console.error(events, "dnid")

watch(()=>horarioStore.horariosScheduleFormat, ()=>{
  events.value = horarioStore.horariosScheduleFormat;
  console.error(events, "dnid")
})
</script>
<template>

  <div class="mt-2 mr-2 max-h-[80%] w-full h-full flex justify-center overflow-y-auto">
    <div class="w-[99%] h-full rounded-xl transition-all duration-200 max-h-full is-light-mode" id="panel">

      <Qalendar  @datetime-was-clicked="(e)=>{console.log(e)}"
          :events="horarioStore.horariosScheduleFormat"></Qalendar>
    </div>
  </div>
</template>
<style>
@import "qalendar/dist/style.css";
</style>
