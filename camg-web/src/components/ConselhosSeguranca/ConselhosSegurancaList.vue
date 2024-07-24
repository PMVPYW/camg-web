<script setup>
import {Icon} from "@iconify/vue";
import {ref} from "vue";
import {useConselhoSegurancaStore} from "@/stores/conselho_seguranca.js";
import ConselhoSeguranca from "./ConselhoSeguranca.vue";
import CreateForm from "./CreateConselhoSegurancaForm.vue"
import CrudButtons from "../common/crudButtons.vue";
import SimpleDeleteForm from "../common/SimpleDeleteForm.vue";

const conselhoSegurancaStore = useConselhoSegurancaStore();

const selected_conselho = ref({})

const setSelectedConselho = (conselho) => {
  if (selected_conselho.value.id != conselho.id) {
    selected_conselho.value = conselho
  } else {
    selected_conselho.value = {}
  }
}
</script>

<template>
  <CrudButtons :obj_to_edit="selected_conselho" :delete_form="SimpleDeleteForm" :create_form="CreateForm" :edit_callback="conselhoSegurancaStore.updateConselhoSeguranca" :delete_callback="conselhoSegurancaStore.deleteConselhoSeguranca" :create_callback="conselhoSegurancaStore.createConselhoSeguranca"></CrudButtons>
  <div class="w-11/12 my-8 h-full rounded-lg mx-auto p-4">
    <ConselhoSeguranca  @click="()=>setSelectedConselho(cs)" v-for="cs in conselhoSegurancaStore.conselhos_seguranca" :key="cs.id" :conselhoSeguranca="cs" :obj_to_edit="selected_conselho" :class="{'bg-gradient-to-br from-[#F3AA06] to-[#997A2E]': selected_conselho.id==cs.id}"></ConselhoSeguranca>
  </div>
</template>
