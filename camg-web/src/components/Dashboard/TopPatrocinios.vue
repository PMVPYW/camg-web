<script setup>
import CountryFlag from 'vue-country-flag'
import { useStatsStore } from "@/stores/stats";
import getCOuntryIso2 from "country-iso-3-to-2";

const statsStore = useStatsStore();

const categories = [];
const data = [];
var sum = 0;
for (const [key, value] of Object.entries(statsStore.topPatrocinios)) {
    categories.push(key);
    data.push({x: key, y: value})
    sum+= value;
}

const half = sum/2;
const percentage_75 = sum * 0.75;
const chartOptions = {
    labels: categories,
    chart: {
        width: 380,
        type: 'treemap',
    },
    plotOptions: {
        pie: {
            startAngle: -90,
            endAngle: 270
        },
    },
    dataLabels: {
        enabled: true,
    },
    legend: {

        formatter: function(val, opts) {
      return val + " - " + data[opts.seriesIndex];
    },
    },
    title: {
        text: 'Entidades que patrocinam mais rallies',
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }],
    plotOptions: {
      treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                  ranges: [
                    {
                      from: half,
                      to: percentage_75,
                      color: '#D97706'
                    },
                    {
                      from: 0,
                      to: half,
                      color: '#6B7280'
                    },
                    {
                      from: percentage_75,
                      to: Infinity,
                      color: '#78350F'
                    }
                  ]
                }
              }
            }
};
const series = [{data: data}]
</script>
<template>
    <div class="min-w-[43%] w-[45%] mx-1 grow my-2 h-56 border-2 pl-8 pb-4 rounded-lg">
        <apexchart type="treemap" width="100%" height="100%" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<style scoped>
.legend-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>