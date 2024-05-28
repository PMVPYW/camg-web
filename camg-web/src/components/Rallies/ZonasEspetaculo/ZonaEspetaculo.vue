<script setup>
import mapboxgl from 'mapbox-gl';
import { ref, onMounted, onUnmounted } from 'vue';
//import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlndWVsZ2FtZWlybzI5IiwiYSI6ImNsd2xiMnNiejAyYjYybHBzZG1ucXQ3aGsifQ.01TPuJIadCf-SRUzfPaTOA'; // Substitua pelo seu token de acesso

const coordenadas = ref(null);
const mapContainer = ref(null);
let map;

onMounted(()=> {
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-8.965979482266903, 39.73957766675534],
      zoom: 11,
    });

    map.on('click', (e) => {
      console.log(e.lngLat)
      coordenadas.value=e.lngLat;
    });
  });
onUnmounted(()=> {
    map.remove();
    map = null;
  });

</script>
<template>
  <div class="flex flex-col h-screen bg-red-100 rounded-2xl">
      <h1 v-if="coordenadas" class="p-4">{{coordenadas}}</h1>
      <div ref="mapContainer" class="flex-1 shadow-2xl rounded-2xl"></div>
  </div>
</template>

