<script setup>
import {ref, watch} from "vue";

const props = defineProps(["obj_to_edit", "errors"])
const emit = defineEmits(["create", "edit"])

const nome = ref(props.obj_to_edit?.nome);
const data_inicio = ref(props.obj_to_edit?.data_inicio);
const data_fim = ref(props.obj_to_edit?.data_fim);
const external_id = ref(props.obj_to_edit?.external_entity_id);
const photo_url = ref(null);
const errors = ref(props.errors ?? {})

watch(()=>props.errors, (n_errors)=>{
  errors.value = n_errors;
})

watch(external_id, (new_external_id, oldValue) => {
  external_id.value = new_external_id.replace(/\D/g, '');
})


const emitRally = () => {
  const obj = {
    "nome": nome.value,
    "data_inicio": data_inicio.value,
    "data_fim": data_fim.value,
    "external_entity_id": external_id.value,
  };
  if (photo_url.value != null) {
    obj["photo_url"] = photo_url.value
  }
  emit(props.obj_to_edit ? 'edit' : "create", obj);
}
</script>

<template>
  <form class="m-2">
      <input type="text" name="nome" placeholder="Nome do rally" required v-model="nome"
             class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-1/2">
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Data Inicio</label>
      <input type="date" name="data_inicio" v-model="data_inicio" placeholder="data inicio" required
             class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-1/6">
    <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Data Fim</label>
    <input type="date" name="data_fim" v-model="data_fim" placeholder="data fim" required
           class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-1/6">
    <br>

    <div class="w-full text-red-600 font-bold items-top flex justify-center" v-if="Object.keys(errors).length">
      <!--first line of errors-->
      <div class="w-1/2 text-center inline-block">{{ errors.nome }}</div>
      <div class="w-1/12 inline-block"></div>
      <div class="w-1/6 text-center inline-block">{{ errors.data_inicio }}</div>
      <div class="w-1/12  inline-block"></div>
      <div class="w-1/6 text-center inline-block">{{ errors.data_fim }}</div>
    </div>
    <br>
    <div class="mx-auto text-center">
      <input type="text" name="external_id" placeholder="ID externo" required v-model="external_id"
             class="text-sm h-10 m-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-1/12">
      <input type="file" accept="image/png, image/gif, image/jpeg"
             class="text-sm h-10 m-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-7/12 file:hidden"
             @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
      <input type="submit"
             @click.prevent="emitRally"
             class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
             :value="props.obj_to_edit ? 'Editar' : 'Criar'"/>
    </div>
    <div class="w-full text-red-600 font-bold mx-auto text-center items-top justify-center flex">
      <!--second line of errors-->
      <div class="w-1/12 text-center inline-block">{{ errors.external_entity_id }}</div>
      <div class="w-7/12 inline-block">{{ errors.photo_url }}</div>
      <div class="w-3/12 inline-block"></div>

    </div>
  </form>
  <hr class="mt-5 mb-10">
</template>