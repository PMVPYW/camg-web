<script setup>
import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";
import Rally from "@/components/Rallies/Rally/Rally.vue";
import { useRallyStore } from "@/stores/rally.js";
import { reactive, ref, watch } from "vue";
import DeleteRallyForm from "@/components/common/SimpleDeleteForm.vue";

const rallyStore = useRallyStore();
const selectedRally = ref({});

//filters
const filters = reactive({
    search: "",
    data_inicio: "",
    data_fim: "",
    order: "proximity",
    status: "all",
});

watch(filters, (new_value) => {
    rallyStore.loadRalliesWithFilters(filters);
});

const setSelectedRally = (rally) => {
    if (selectedRally.value.id != rally.id) {
        selectedRally.value = rally;
    } else {
        selectedRally.value = {};
    }
};
</script>

<template>
    <CrudButtons
        :create_callback="rallyStore.createRally"
        :create_form="CreateRallyForm"
        :edit_callback="rallyStore.updateRally"
        :delete_callback="rallyStore.deleteRally"
        :delete_form="DeleteRallyForm"
        :obj_to_edit="selectedRally"
        @clearSelected="selectedRally = {}"
    ></CrudButtons>
    <div class="w-11/12 my-8 h-full rounded-lg justify-center mx-auto p-4">
        <div class="m-2 w-11/12 mx-auto rounded-lg text-center">
            <input
                type="text"
                placeholder="Pesquisar"
                v-model.lazy="filters.search"
                class="w-11/12 lg:w-1/2 text-sm my-2 ml-2 p-2 font-bold text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10"
            />
            <label
                class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12"
                >De</label
            >
            <input
                type="date"
                placeholder="data inicio"
                required
                v-model="filters.data_inicio"
                class="w-11/12 lg:w-1/6 text-sm my-2 ml-2 p-2 font-bold text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10"
            />
            <label
                class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12"
                >Até</label
            >
            <input
                type="date"
                placeholder="data fim"
                required
                v-model="filters.data_fim"
                class="w-11/12 lg:w-1/6 text-sm my-2 ml-2 p-2 font-bold text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10"
            />

            <br />
            <label
                class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12"
                >Ordenar:</label
            >
            <select
                v-model="filters.order"
                class="w-11/12 lg:w-1/6 text-sm my-2 ml-2 p-2 text-center border border-amber-400 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none h-10"
            >
                <option value="proximity">Por proximidade</option>
                <option value="date_desc">Por data decrescente</option>
                <option value="date_asc">Por data crescente</option>
            </select>
            <label
                class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-1/12"
                >Status</label
            >
            <select
                v-model="filters.status"
                class="w-11/12 lg:w-1/6 text-sm my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10"
            >
                <option value="all">Todos</option>
                <option value="not_started">Por iniciar</option>
                <option value="on_going">A decorrer</option>
                <option value="terminated">Terminado</option>
            </select>
        </div>

        <TransitionGroup name="list">
            <Rally
                v-for="rally in rallyStore.rallies_filtered"
                :key="rally.id"
                @click="() => setSelectedRally(rally)"
                :rally="rally"
                class="border-2 rounded-xl"
                :class="{
                    'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]':
                        selectedRally.id == rally.id,
                }"
            ></Rally>
        </TransitionGroup>
    </div>
</template>
<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>
