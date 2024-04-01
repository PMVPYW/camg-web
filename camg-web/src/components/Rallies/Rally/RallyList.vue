<script setup>

import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";
import Rally from "@/components/Rallies/Rally/Rally.vue";
import {useRallyStore} from "@/stores/rally.js";
import {ref} from "vue";

const rallyStore = useRallyStore();
const selectedRally = ref({});


</script>

<template>
  <CrudButtons :create_callback="rallyStore.createRally" :create_form="CreateRallyForm" :edit_callback="rallyStore.updateRally" :obj_to_edit="selectedRally"></CrudButtons>
  <div class="border-4 w-11/12 my-8 h-full rounded-lg justify-center mx-auto bg-[#f8f9fe]">

      <Rally v-for="rally in rallyStore.rallies" :key="rally.id" @click="selectedRally = rally" :rally="rally" class="border-2 rounded-xl" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selectedRally.id==rally.id}"></Rally>
  </div>
</template>
