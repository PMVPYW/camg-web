<script setup>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { ref, onMounted, onUnmounted, watch } from "vue";
import CreateZonaEspetaculo from "@/components/Rallies/ZonasEspetaculo/CreateZonaEspetaculo.vue";
import { useZonaEspetaculoStore } from "@/stores/zonaEspetaculo.js";
const props = defineProps(["redraw"]);
const emit = defineEmits(["selectedZonaEspetaculo", "createZonaEspetaculo"]);

mapboxgl.accessToken =
    "pk.eyJ1IjoibWlndWVsZ2FtZWlybzI5IiwiYSI6ImNsd2xiMnNiejAyYjYybHBzZG1ucXQ3aGsifQ.01TPuJIadCf-SRUzfPaTOA"; // Substitua pelo seu token de acesso

const coordenadas = ref(null);
const mapContainer = ref(null);
const markers = ref({});
const zonaEspetaculoStore = useZonaEspetaculoStore();

const user_lat = ref(0);
const user_long = ref(0);

let map;

onMounted(async () => {
    map = new mapboxgl.Map({
        container: mapContainer.value,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/satellite-streets-v12", // style URL
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
    <div class="flex flex-col h-dvh bg-red-100 rounded-2xl">
        <div ref="mapContainer" id="map" class="flex-1 shadow-2xl"></div>
        <div class="p-3">
            <p>
                Clica no mapa para desenhar um Zona de Espetáculo,<br />o
                primeiro ponto da sua marcação será a entrada da zona
            </p>
            <h1>{{ user_lat }} ads {{ user_long }}</h1>
        </div>
    </div>
</template>
