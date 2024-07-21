<script setup>
import {Icon} from "@iconify/vue";
import CrudButtons from "../common/crudButtons.vue";
import ConselhosSegurancaList from "./ConselhosSegurancaList.vue";

</script>

<template>
  <div class="h-full w-full rounded-xl transition-all duration-200" id="panel">
    <h1 class="text-2xl font-bold ml-10 mt-10">Conselhos de Segurança</h1>
    <ConselhosSegurancaList/>
  </div>
</template>
