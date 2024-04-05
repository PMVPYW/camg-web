<script setup>

import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";
import Rally from "@/components/Rallies/Rally/Rally.vue";
import {useRallyStore} from "@/stores/rally.js";
import {reactive, ref, watch} from "vue";
import DeleteRallyForm from "@/components/Rallies/Rally/DeleteRallyForm.vue";

const rallyStore = useRallyStore();
const selectedRally = ref({});

//filters
const filters = reactive({search: "", data_inicio: '', data_fim: '', order: 'proximity', status: 'all'})

watch(filters, (new_value) => {
  rallyStore.loadRallies(filters)
})

const setSelectedRally = (rally) => {
  if (selectedRally.value.id != rally.id) {
    selectedRally.value = rally
  } else {
    selectedRally.value = {}
  }

}


</script>

<template>
  <CrudButtons :create_callback="rallyStore.createRally" :create_form="CreateRallyForm"
               :edit_callback="rallyStore.updateRally" :delete_callback="rallyStore.deleteRally"
               :delete_form="DeleteRallyForm"
               :obj_to_edit="selectedRally"
               @clearSelected="selectedRally = {}"></CrudButtons>
  <div class="border-4 w-11/12 my-8 h-full rounded-lg justify-center mx-auto bg-[#f8f9fe] p-4">
    <Rally v-for="rally in rallyStore.rallies" :key="rally.id" @click="()=>setSelectedRally(rally)" :rally="rally"
           class="border-2 rounded-xl"
           :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedRally.id==rally.id}"></Rally>
  </div>
</template>
