<script setup>
import { useRallyStore } from "@/stores/rally.js";
import { Icon } from "@iconify/vue";
import ZonaEspetaculo from "@/components/Rallies/ZonasEspetaculo/ZonaEspetaculo.vue";
import CrudButtons from "@/components/common/crudButtons.vue";
import { ref } from "vue";
import { useZonaEspetaculoStore } from "@/stores/zonaEspetaculo.js";
import CreateZonaEspetaculo from "@/components/Rallies/ZonasEspetaculo/CreateZonaEspetaculo.vue";
import SimpleDeleteForm from "@/components/common/SimpleDeleteForm.vue";

const rallyStore = useRallyStore();
const zonaEspetaculoStore = useZonaEspetaculoStore();
const selectedZonaEspetaculo = ref({});
const creatingObj = ref({});
const creating = ref(false);

const redraw_map = ref(false);

function selected_emit(new_var) {
    console.log(JSON.parse(new_var));
    //precisa de conversão para Json pois não é um objeto
    selectedZonaEspetaculo.value = JSON.parse(new_var);
}
</script>

<template>
    <div
        v-if="rallyStore.rally_selected"
        class="h-full w-full rounded-xl transition-all duration-200"
        id="panel"
    >
        <h1 class="text-2xl font-bold ml-10 mt-10">Zonas Espetáculo</h1>
        <CrudButtons
            :create_form="CreateZonaEspetaculo"
            :edit_callback="zonaEspetaculoStore.editZonaEspetaculo"
            :create_callback="zonaEspetaculoStore.createZonaEspetaculo"
            :obj_to_edit="selectedZonaEspetaculo"
            :delete_callback="zonaEspetaculoStore.deleteZonaEspetaculo"
            :delete_form="SimpleDeleteForm"
            @clearSelected="selectedZonaEspetaculo = {}"
            :change_create_state="creating"
            :obj_to_create="creatingObj"
            @create_canceled="
                () => {
                    redraw_map = false;
                    redraw_map = true;
                }
            "
        ></CrudButtons>
        <div class="m-16">
            <ZonaEspetaculo
                :redraw="redraw_map"
                @createZonaEspetaculo="
                    (coordinates) => {
                        console.warn(typeof func, 'll');
                        creatingObj = { coordenadas: coordinates };
                        /*
                         * creating ref
                         * set false to make sure whe is set to true, it changes
                         * set true to trigger open form
                         */
                        creating = false;
                        creating = true;
                    }
                "
                @selectedZonaEspetaculo="selected_emit"
            ></ZonaEspetaculo>
        </div>
    </div>
    <div v-else class="mx-auto mt-12">
        <div
            class="flex flex-row items-center bg-gray-100 border border-amber-400 py-2 px-4 rounded-xl"
        >
            <h1 class="text-gray-500 text-base font-medium">
                Não existem rallys, para ver as zonas de espetáculo de um rally
                terá que o criar primeiro!
            </h1>
            <div>
                <router-link
                    :to="{ name: 'rallies' }"
                    class="py-2.7 h-10 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg px-4 font-semibold text-slate-700 transition-colors bg-white shadow-xl"
                >
                    <div
                        class="bg-gradient-to-tl from-amber-600 to-yellow-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5 my-1"
                    >
                        <Icon
                            icon="mdi:car-traction-control"
                            class="min-w-5 min-h-5 text-white"
                        >
                            <title>Criar Rally</title>
                        </Icon>
                    </div>
                    <span
                        class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft"
                        >Criar Rally</span
                    >
                </router-link>
            </div>
        </div>
    </div>
</template>
