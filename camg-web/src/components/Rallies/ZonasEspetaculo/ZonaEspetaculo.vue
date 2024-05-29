<script setup>
import mapboxgl from 'mapbox-gl';
import { ref, onMounted, onUnmounted } from 'vue';
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";
import CreateZonaEspetaculo from "@/components/Rallies/ZonasEspetaculo/CreateZonaEspetaculo.vue";
//import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlndWVsZ2FtZWlybzI5IiwiYSI6ImNsd2xiMnNiejAyYjYybHBzZG1ucXQ3aGsifQ.01TPuJIadCf-SRUzfPaTOA'; // Substitua pelo seu token de acesso

const coordenadas = ref(null);
const mapContainer = ref(null);
const creating = ref(false);

let map;

onMounted(()=> {
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-8.965979482266903, 39.73957766675534],
      zoom: 11,
    });

    map.on('click', (e) => {
      console.log(e.lngLat.toString().split('(')[1].split(')')[0]);
      coordenadas.value=e.lngLat.toString().split('(')[1].split(')')[0];
      creating.value=true;
    });
  });
onUnmounted(()=> {
    map.remove();
    map = null;
  });

</script>
<template>
  <div v-if="creating === true" class="w-full">
    <button @click="()=>{creating=false}" type="button" class="text-gray-400 font-bold text-lg mb-4 mt-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
      </svg>
    </button>
    <CreateZonaEspetaculo :coordenadas="coordenadas"></CreateZonaEspetaculo>
    <hr class="mt-5 mb-10">
  </div>
  <div class="flex flex-col h-screen bg-red-100 rounded-2xl">
      <h1 v-if="coordenadas" class="p-4">{{coordenadas}}</h1>
      <div ref="mapContainer" class="flex-1 shadow-2xl rounded-2xl"></div>
  </div>
</template>

