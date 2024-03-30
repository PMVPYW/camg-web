<script setup>

import CrudButtons from "@/components/common/crudButtons.vue";
import CreateRallyForm from "@/components/Rallies/Rally/CreateRallyForm.vue";
const cre = ()=>alert("I");
</script>

<template>
  <CrudButtons :create_callback="cre" :create_form="CreateRallyForm"></CrudButtons>
</template>
