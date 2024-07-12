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
    data.push({x: key + " " + getFlagEmoji(getCOuntryIso2(key)), y: value})
}

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
    }],
    plotOptions: {
              treemap: {
                enableShades: true,
                shadeIntensity: 0.5,
                reverseNegativeShade: true,
                colorScale: {
                  ranges: [
                    {
                      from: -6,
                      to: 0,
                      color: '#CD363A'
                    },
                    {
                      from: 0.001,
                      to: 6,
                      color: '#52B12C'
                    }
                  ]
                }
              }
            }
};
const series = [{data: data}]
</script>
<template>
    <div class="w-1/2 my-2 h-56 border-2 pl-8 pb-4 rounded-lg">
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