<script setup>
import CountryFlag from 'vue-country-flag'
import { useStatsStore } from "@/stores/stats";
import getCOuntryIso2 from "country-iso-3-to-2";

const statsStore = useStatsStore();

const categories = [];
const data = [];

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

for (const [key, value] of Object.entries(statsStore.top_nacionalidades_rally)) {
    categories.push(key);
    data.push(value)
}

const chartOptions = {
    labels: categories,
    chart: {
        width: 380,
        type: 'donut',
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
      return getFlagEmoji(getCOuntryIso2(val)) + " " + val + " - " + data[opts.seriesIndex];
    },
    },
    title: {
        text: 'Distribuição da nacionalidade dos participantes de todosos rallyes',
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
    }]
};
const series = data
  
</script>
<template>
    <div class="w-1/2 h-72 border-2 rounded-lg">
        <apexchart type="donut" height="100%" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>
<style scoped>
.legend-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
</style>