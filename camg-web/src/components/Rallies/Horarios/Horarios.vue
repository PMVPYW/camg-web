<script setup>
import HorariosTable from "@/components/Rallies/Horarios/HorariosTable.vue";
</script>

<template>
  <div class="h-dvh rounded-xl transition-all duration-200 w-full max-h-dvh" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Horários</h1>
    <HorariosTable class="w-full h-[80%] overflow-y-auto"></HorariosTable>
  </div>
</template>
