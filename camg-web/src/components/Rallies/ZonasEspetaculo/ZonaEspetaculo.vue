<script setup>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import {ref, onMounted, onUnmounted, watch, inject} from "vue";
import axios from "axios";
import { useZonaEspetaculoStore } from "@/stores/zonaEspetaculo.js";
import {useProvaStore} from "@/stores/prova.js";
import { kml } from "@tmcw/togeojson";
import {Icon} from "@iconify/vue";



const props = defineProps(["redraw"]);
const emit = defineEmits(["selectedZonaEspetaculo", "createZonaEspetaculo"]);
const serverBaseUrl = inject("serverBaseUrl");

mapboxgl.accessToken =
    "pk.eyJ1IjoibWlndWVsZ2FtZWlybzI5IiwiYSI6ImNsd2xiMnNiejAyYjYybHBzZG1ucXQ3aGsifQ.01TPuJIadCf-SRUzfPaTOA"; // Substitua pelo seu token de acesso


const coordenadas = ref(null);
const mapContainer = ref(null);
const markers = ref({});
const zonaEspetaculoStore = useZonaEspetaculoStore();
const provaStore = useProvaStore();
const openButton = ref(false);
const style_map = ref('mapbox://styles/mapbox/satellite-streets-v12');
let map;

const user_lat = ref(0);
const user_long = ref(0);

const kmlData = ref({});

const parseKML = async (prova) => {
  try {
    const response = await axios.get(`${serverBaseUrl}/storage/kml_files/${prova.kml_src}`);
    const kmlContent = response.data;
    const parsedKml = new DOMParser().parseFromString(kmlContent, 'text/xml');
    if (parsedKml) {
      const geojson = kml(parsedKml).features;
      let cor = Math.floor(Math.random() * 0x7F7F7F).toString(16).padStart(6, '0');
      console.log("geojson", geojson)
      geojson.forEach(feature => {
        feature.properties.color = '#'+cor;
      });
      kmlData.value[prova.id] = geojson;
    } else {
      console.error('Falha ao analisar o KML');
    }
  } catch (error) {
    console.error(`Erro ao obter o arquivo KML: ${error.message}`);
  }
};

provaStore.provas.forEach((prova)=>{
  if(prova.kml_src) {
    parseKML(prova);
    console.log("kmlData", kmlData.value)
  }
})

const changeMapStyle = (style) => {
  if (map) {
    map.setStyle(style);
    style_map.value = style;
  }
};



onMounted(async () => {
    map = new mapboxgl.Map({
        container: mapContainer.value,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: style_map.value, // style URL
        //    style: "mapbox://styles/mapbox/streets-v12",
        center: [-8.965979482266903, 39.73957766675534],
        zoom: 9, // starting zoom
    });
    console.log([user_lat.value, user_long.value], "vl");
    navigator.geolocation.getCurrentPosition((location) => {
        /*new mapboxgl.Marker({ color: "#0000ff" })
            .setLngLat([location.coords.longitude, location.coords.latitude])
            .addTo(map);*/
    });

    const drawMap = () => {
        const zonaEspetaculoFeatures = zonaEspetaculoStore.zonaEspetaculo.map(
            (zona) => ({
                type: "Feature",
                geometry: {
                    type: "Polygon",
                    coordinates: JSON.parse(
                        "[[" + (zona.coordenadas ?? "") + "]]",
                    ),
                },
                properties: {
                    ZonaEspetaculo: zona,
                    nome: zona.nome,
                    nivel_afluencia: zona.nivel_afluencia,
                    facilidade_acesso: zona.facilidade_acesso,
                    distancia_estacionamento: zona.distancia_estacionamento,
                    nivel_ocupacao: zona.nivel_ocupacao,
                },
            }),
        );

        const KmlFeatures = [].concat(...provaStore.provas.map(prova => kmlData.value[prova.id] || []));

        provaStore.provas.forEach((prova)=>{
          const geojson = kmlData.value[prova.id];
          console.log("Geojson", geojson)
          if(geojson) {
            draw.set({
              type: "FeatureCollection",
              features: geojson,
            });
          }
        })


        draw.deleteAll();
        //eliminar todos os markers
        for (let key in markers.value) {
            markers.value[key].remove();
        }



        // Adicionar os polígonos carregados à instância do Mapbox Draw
        draw.set({
            type: "FeatureCollection",
            features: zonaEspetaculoFeatures,
        });

        // Adicionar a fonte ao mapa
        if (map.getSource("places")) {
            map.getSource("places").setData({
                type: "FeatureCollection",
                features: zonaEspetaculoFeatures,
            });
        } else {
            map.addSource("places", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: zonaEspetaculoFeatures,
                },
            });
        }

        // Adicionar a camada ao mapa se ela não tiver sido adicionada
        if (!map.getLayer("places")) {
            map.addLayer({
                id: "places",
                type: "fill",
                source: "places",
                layout: {},
                paint: {
                    "fill-opacity": 0.5,
                },
            });
        }


      if (!map.getLayer("kml-layer")) {
        map.addLayer({
          id: "kml-layer",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: KmlFeatures,
            },
          },
          layout: {},
          paint: {
            'line-color': ['get', 'color'],
            'line-width': 4,
          },
        });
      } else if (map.getSource("kml-layer")) {
        map.getSource("kml-layer").setData({
          type: "FeatureCollection",
          features: KmlFeatures,
        });
      } else {
        map.addSource("kml-layer", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: KmlFeatures,
          },
        });
      }

        console.log("Zonas de Espetaculo", zonaEspetaculoStore.zonaEspetaculo);
        for (let i = 0; i < zonaEspetaculoStore.zonaEspetaculo.length; i++) {
            console.log(
                JSON.parse(
                    "[" +
                        (zonaEspetaculoStore.zonaEspetaculo[i]
                            ? zonaEspetaculoStore.zonaEspetaculo[i]?.coordenadas
                            : "") +
                        "]",
                )[0],
            );
            let entrada = JSON.parse(
                "[" + zonaEspetaculoStore.zonaEspetaculo[i]?.coordenadas + "]",
            )[0];
            if (markers.value[zonaEspetaculoStore.zonaEspetaculo[i].id]) {
                markers.value[
                    zonaEspetaculoStore.zonaEspetaculo[i].id
                ].remove();
            }
            markers.value[zonaEspetaculoStore.zonaEspetaculo[i].id] =
                new mapboxgl.Marker({ color: "#facc15" });
            markers.value[zonaEspetaculoStore.zonaEspetaculo[i].id]
                .setLngLat(entrada)
                .addTo(map);
        }
    };
    watch(
        () => props.redraw,
        (new_value) => {
            if (new_value === true) {
                console.error("ueueu");
                drawMap();
            }
        },
    );
    const location = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true,
        },
        fitBoundsOptions: { boxZoom: 9 },
    });
    const draw = new MapboxDraw({
        //https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/EXAMPLES.md
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
            polygon: true,
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: "draw_polygon",
    });
    map.addControl(location).addControl(draw);

    map.on("load", () => {
        drawMap();
        location.trigger();
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", "places", (e) => {
        const ze = zonaEspetaculoStore.zonaEspetaculo.find(
            (item) =>
                item.id ==
                JSON.parse(e.features[0].properties.ZonaEspetaculo).id,
        );
        console.log(ze, "ze");
        const coordinates = e.features[0].geometry.coordinates[0][0];
        const nome = ze.nome;
        const nivel_afluencia = ze.nivel_afluencia;
        const facilidade_acesso = ze.facilidade_acesso;
        const distancia_estacionamento = ze.distancia_estacionamento;
        const nivel_ocupacao = ze.nivel_ocupacao;

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                `<strong><b>${nome}</b></strong>
                    <br><h2 class="my-1">Nível de Afluência: <b class="px-3 py-2 rounded-xl ${nivel_afluencia == "Baixo" ? "bg-green-300" : nivel_afluencia == "Médio" ? "bg-amber-300" : "bg-red-300"}">${nivel_afluencia}</b></h2>
                    <h2 class="my-1">Facilidade de Acesso: <b class="px-3 py-2 rounded-xl ${facilidade_acesso == "Fácil" ? "bg-green-300" : facilidade_acesso == "Médio" ? "bg-amber-300" : "bg-red-300"}">${facilidade_acesso}</b></h2>
                    <h2 class="my-1">Distância Estancionamento: <b>${distancia_estacionamento}Km</b></h2>
                    <h2 class="my-1">Nível de Ocupação: <b  class="px-3 py-2 rounded-xl ${nivel_ocupacao == "Livre" ? "bg-green-300" : nivel_ocupacao == "Intermédio" ? "bg-amber-300" : "bg-red-300"}">${nivel_ocupacao}</b></h2>
                    `,
            )
            .addTo(map);

        const ZonaEspetaculo = e.features[0].properties.ZonaEspetaculo;
        emit("selectedZonaEspetaculo", ZonaEspetaculo);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a default cursor when it leaves.
    map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
    });

    map.on("draw.create", updateArea);
    map.on("draw.update", updateArea);

    async function updateArea(e) {
        console.log("e:", e);
        if (e.type == "draw.create") {
            console.log(e.features[0].geometry.coordinates[0]);
            let coordenadas_ze =
                "[" + e.features[0].geometry.coordinates[0][0] + "]";
            for (
                let i = 0;
                i < e.features[0].geometry.coordinates[0].length;
                i++
            ) {
                if (i === 0) {
                    let entrada = e.features[0].geometry.coordinates[0][i];
                    console.log(entrada);
                    if (markers.value["delete"]) {
                        markers.value["delete"].remove();
                    }
                    markers.value["delete"] = new mapboxgl.Marker({
                        color: "#facc15",
                    })
                        .setLngLat(entrada)
                        .addTo(map);
                } else {
                    console.log(e.features[0].geometry.coordinates[0][i]);
                    coordenadas_ze +=
                        ",[" + e.features[0].geometry.coordinates[0][i] + "]";
                    console.log("coordenadas:", coordenadas_ze);
                }
                coordenadas.value = coordenadas_ze;
                emit("createZonaEspetaculo", coordenadas.value, drawMap);
            }
            console.log("draw.create");
        } else if (e.type == "draw.update") {
            console.warn(e.type);
            let coordenadas_ze =
                "[" + e.features[0].geometry.coordinates[0][0] + "]";
            for (
                let i = 0;
                i < e.features[0].geometry.coordinates[0].length;
                i++
            ) {
                if (i !== 0) {
                    console.log(e.features[0].geometry.coordinates[0][i]);
                    coordenadas_ze +=
                        ",[" + e.features[0].geometry.coordinates[0][i] + "]";
                    console.log("coordenadas:", coordenadas_ze);
                }
                coordenadas.value = coordenadas_ze;
            }
            console.log("event", e.features[0].properties.ZonaEspetaculo.id);
            await zonaEspetaculoStore.editZonaEspetaculo(
                { coordenadas: coordenadas_ze },
                e.features[0].properties.ZonaEspetaculo.id,
            );
            drawMap();
            console.log("draw.update");
        }
    }
    watch(
        () => zonaEspetaculoStore.zonaEspetaculo,
        () => {
            drawMap();
        },
        { deep: true },
    );
});
onUnmounted(() => {
    map.remove();
});
</script>
<template>
    <div class="flex flex-col h-dvh rounded-2xl">
      <button @click="openButton=!openButton"
          type="button"
          class="md:w-3/12 sm:w-full justify-center opacity-85 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
            <span v-if="openButton">Cancelar</span>
            <div class="flex" v-else><span>Escolher outro mapa </span><Icon icon="iconamoon:arrow-down-2-fill" class="min-w-5 min-h-5 text-white" /></div>
      </button>
        <div v-if="openButton" class="p-2 mb-4 flex flex-row w-9/12 bg-gray-500 rounded-b-2xl rounded-r-2xl mx-3">
          <div @click="changeMapStyle('mapbox://styles/mapbox/dark-v11')" :class="`w-1/5 rounded-2xl mx-2 ${style_map === 'mapbox://styles/mapbox/dark-v11' ? 'border-4 border-blue-500' : ''}`">
            <img class="w-full rounded-xl" src=@/assets/dark.png alt="Logo">
          </div>
          <div @click="changeMapStyle('mapbox://styles/mapbox/light-v11')" :class="`w-1/5 rounded-2xl mx-2 ${style_map === 'mapbox://styles/mapbox/light-v11' ? 'border-4 border-blue-500' : ''}`">
            <img class="w-full rounded-xl" src='@/assets/light.png' alt="Logo">
          </div>
          <div @click="changeMapStyle('mapbox://styles/mapbox/outdoors-v12')" :class="`w-1/5 rounded-2xl mx-2 ${style_map === 'mapbox://styles/mapbox/outdoors-v12' ? 'border-4 border-blue-500' : ''}`">
            <img class="w-full rounded-xl" src='@/assets/outdoors.png'
                 alt="Logo">
          </div>
          <div @click="changeMapStyle('mapbox://styles/mapbox/satellite-streets-v12')" :class="`w-1/5 rounded-2xl mx-2 ${style_map === 'mapbox://styles/mapbox/satellite-streets-v12' ? 'border-4 border-blue-500' : ''}`">
            <img class="w-full rounded-xl" src='@/assets/satelliteStreets.png' alt="Logo">
          </div>
          <div @click="changeMapStyle('mapbox://styles/mapbox/streets-v12')" :class="`w-1/5 rounded-2xl mx-2 ${style_map === 'mapbox://styles/mapbox/streets-v12' ? 'border-4 border-blue-500' : ''}`">
            <img class="w-full rounded-xl" src='@/assets/streets.png' alt="Logo">
          </div>
        </div>
      <div ref="mapContainer" id="map" class="flex-1 shadow-2xl mt-2"></div>

    </div>
</template>
