<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import {useConselhoSegurancaStore} from "@/stores/conselho_seguranca.js";4
import CreateForm from "./CreateConselhoSegurancaForm.vue"
import CrudButtons from "../common/crudButtons.vue";

const conselhoSegurancaStore = useConselhoSegurancaStore();

const selected_concelho = ref({})
</script>

<template>
  <CrudButtons :obj_to_edit="selected_concelho" :create_form="CreateForm"></CrudButtons>
  <div class="w-11/12 my-8 h-full rounded-lg justify-center mx-auto p-4">
   
  </div>
</template>
