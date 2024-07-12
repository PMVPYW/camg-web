<script setup>
import { ref } from 'vue';
 import AnimatedNumber from './AnimatedNumber.vue'


const props = defineProps({opcao1: {default: "Number"}, opcao2: {default: "Chart"}, stat1: {default: 20000000000}, unidade_medida: {default: ""}, chartCategories: {default: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]},
series: {default: [30, 40, 45, 50, 49, 60, 70, 91]}
});

const selected = ref(0);

const chartOptions = {
  chart: {
    id: 'basic-bar'
    },
  xaxis: {
    categories: props.chartCategories
  },
  dataLabels: {
    enabled: false, // Disable data labels
  }, 
  fill: {
    colors: ["#facc15"]
  },
  stroke: {
    colors: ['#d97706']
  }
};

const series = [{
    name: props.unidade_medida,
    data: props.series,
    style: {
        color: '#d97706'
    }
  }]

</script>
<template>
    <div class="w-3/4 h-8 m-2 rounded-lg mx-auto flex justify-center items-center">
        <button class="w-1/2 h-full border-r-2 rounded-l-lg text-white text-sm" :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl' : selected == 0, 'bg-gray-500' : selected != 0}" @click="()=>{selected = 0}">{{ props.opcao1 }}</button>
        <button class="w-1/2 h-full border-l-2 rounded-r-lg text-white text-sm" :class="{'bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl' : selected == 1, 'bg-gray-500' : selected != 1}" @click="()=>{selected = 1}">{{ props.opcao2 }}</button>
    </div>
    <div class="w-11/12 h-32 mx-auto flex items-center justify-center">
        <div class="w-full h-full flex flex-wrap items-center justify-center text-xl" v-if="selected == 0">
          <span class="max-w-[99%] break-words flex flex-wrap items-center justify-center"><h1 class="inline text-3xl font-bold mr-2"><AnimatedNumber :target="props.stat1"/></h1>{{ props.unidade_medida }}</span>
        </div>
        <div v-else class="w-full h-full flex items-center">
            <apexchart type="area" width="100%" height="100%" class="w-full h-full"
            style="width: 100%; height: 100%;" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>