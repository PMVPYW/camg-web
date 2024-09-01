<script setup>
import { useRallyStore } from '@/stores/rally';
import { useStatsStore } from '@/stores/stats';
import { Tooltip } from 'flowbite';
import { computed } from 'vue';


const statsStore = useStatsStore();
const rallyStore = useRallyStore();

console.warn(statsStore.diff_pior_melhor)

const series = [
     {
      name: 'Melhor tempo',
      data: statsStore.melhor_tempo_rally,
      color:"#00AA00",
     },
     {
      name: 'Pior tempo',
      data: statsStore.diff_pior_melhor,
      color:"#FF0000"
     }
     ]
     const chartOptions = {
      chart: {
       height: 350,
       type: 'bar',
       stacked: true,
      },
      fill: {
  colors: ["#ff0000", "#00AA00"]
 },
      dataLabels: {
       enabled: true,
       formatter: function(val, opt) {
        const min = Math.floor(val / 60);
        const seg = (val % 60).toFixed(1);
        return (opt.seriesIndex == 1 ? "+" : '')+ min + ":" + seg;
       },
      },
      plotOptions: {
       bar: {
       dataLabels: {
         total: {
          enabled: true,
          style: {
           fontSize: '13px',
           fontWeight: 900
          },
          formatter: function(val, opt) {
        const min = Math.floor(val / 60);
        const seg = (val % 60).toFixed(1);
        return min + ":" + seg;
       },
         }
        }
       }
      },
      tooltip: {
       enabled: false
      },
      xaxis: {
       categories: statsStore.nome_rallies,
       labels: {
        rotate: -45
       },
       tickPlacement: 'on'
           },
           yaxis: {
       labels: {
        show: false
       }
       },
     }



</script>
<template>
 <div class="w-full h-96 my-2 mx-1 p-2 border-2 rounded-xl">
    <apexchart type="bar" height="100%" width="100%" :options="chartOptions" :series="series"></apexchart>
   </div>
</template>
