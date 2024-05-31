<script setup>
import mapboxgl from 'mapbox-gl';
import {ref, onMounted, onUnmounted, inject} from 'vue';
import CreatePatrocinioForm from "@/components/Rallies/Patrocinios/CreatePatrocinioForm.vue";
import CreateZonaEspetaculo from "@/components/Rallies/ZonasEspetaculo/CreateZonaEspetaculo.vue";
import {useZonaEspetaculoStore} from "@/stores/zonaEspetaculo.js";
//import '../../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWlndWVsZ2FtZWlybzI5IiwiYSI6ImNsd2xiMnNiejAyYjYybHBzZG1ucXQ3aGsifQ.01TPuJIadCf-SRUzfPaTOA'; // Substitua pelo seu token de acesso

const coordenadas = ref(null);
const creating = ref(false);
const mapContainer = ref(null);

const zonaEspetaculoStore = useZonaEspetaculoStore();



let map;

onMounted(async ()=> {
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-8.965979482266903, 39.73957766675534],
      zoom: 6.5,
    });



  map.on('load', () => {
    map.addSource('places', zonaEspetaculoStore.zonaEspetaculo);
    // Add a layer showing the places.
    map.addLayer({
      'id': 'places',
      'nome': 'places',
      'coordenadas' : 'places'
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'places', (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].coordenadas.slice();
      const nome = e.features[0].nome;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(nome)
          .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
      map.getCanvas().style.cursor = '';
    });
    map.on('click', (e) => {
      console.log(e.lngLat.toString().split('(')[1].split(')')[0]);
      coordenadas.value=e.lngLat.toString().split('(')[1].split(')')[0];
      creating.value=true;
    });



    for (let i=0; i< zonaEspetaculoStore.zonaEspetaculo.length;i++){
      console.log(zonaEspetaculoStore.zonaEspetaculo[i]?.coordenadas)
      let coordenadas = JSON.parse(zonaEspetaculoStore.zonaEspetaculo[i]?.coordenadas);
      new mapboxgl.Marker({ color: '#facc15'})
          .setLngLat(coordenadas)
          .addTo(map);
    }
  });

});
onUnmounted(()=> {
    map.remove();
    map = null;
  });

/*
onMounted(() => {
  let map = zonaEspetaculoStore.getMapInstance();
console.log(map)
  if (!map) {
    // Cria a instância do mapa se ainda não existir
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-8.965979482266903, 39.73957766675534],
      zoom: 6.5,
    });

    zonaEspetaculoStore.setMapInstance(map);

    // Adiciona os eventos e marcadores ao mapa
    map.on('click', (e) => {
      const coords = e.lngLat.toString().split('(')[1].split(')')[0];
      coordenadas.value = coords;
      creating.value = true;
    });

    zonaEspetaculoStore.zonaEspetaculo.forEach(zona => {
      const coords = JSON.parse(zona.coordenadas);
      new mapboxgl.Marker({ color: '#facc15' }).setLngLat(coords).addTo(map);
    });
  } else {
    // Redefine o contêiner do mapa
    const oldContainer = map.getContainer();
    if (oldContainer != mapContainer.value) {
      console.log("CAIU")
      mapContainer.value.appendChild(oldContainer.firstChild);
      map.resize();
    }
  }
});*/


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
  <div class="flex flex-col h-dvh bg-red-100 rounded-2xl">
      <h1 v-if="coordenadas" class="p-4">{{coordenadas}}</h1>
    <div ref="mapContainer" id="map" class="flex-1 shadow-2xl"></div>
  </div>
</template>


