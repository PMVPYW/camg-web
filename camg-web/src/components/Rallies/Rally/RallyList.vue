<script setup>

import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";
import Rally from "@/components/Rallies/Rally/Rally.vue";
import {useRallyStore} from "@/stores/rally.js";

const rallyStore = useRallyStore();

const cre = ()=>alert("I");

</script>

<template>
  <CrudButtons :create_callback="cre" :create_form="CreateRallyForm"></CrudButtons>
  <div class="border-4 w-11/12 my-8 h-full rounded-lg justify-center mx-auto bg-[#f8f9fe]">

      <Rally v-for="rally in rallyStore.rallies" :key="rally.id" :rally="rally"></Rally>
  </div>
</template>
