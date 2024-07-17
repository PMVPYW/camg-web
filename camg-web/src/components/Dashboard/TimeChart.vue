<script setup>
import { useStatsStore } from '@/stores/stats';


const statsStore = useStatsStore();

const series = [
          {
            name: 'pior tempo',
            data: statsStore.pior_tempo_rally
          },
          {
            name: 'melhor tempo',
            data: statsStore.melhor_tempo_rally,
            color:"#00AA00"
          }]
          const chartOptions = {
            chart: {
              height: 350,
              type: 'area'
            },
            fill: {
    colors: ["#ff0000", "#00AA00"]
  },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth',
              colors: ["#ff0000", "#00AA00"]
            },
            xaxis: {
              categories: statsStore.nome_rallies
            }
          }
          
          
        
</script>
<template>
  <div class="w-full h-96 my-2 mx-1 p-2 border-2 rounded-xl">
        <apexchart type="area" height="100%" width="100%" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>
