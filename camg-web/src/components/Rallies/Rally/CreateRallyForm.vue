<script setup>
 import {ref} from "vue";

 const nome = ref("");
 const data_inicio = ref("");
 const data_fim = ref("");
 const external_id = ref("");
 const photo_url = ref(null);
</script>

<template>
    <form class="m-2">
      <input type="text" name="nome" placeholder="Nome do rally" required v-model="nome" class="h-10 m-2 p-2 font-bold text-center border-2 rounded-lg w-1/2">
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Data Inicio</label>
      <input type="date" name="data_inicio" v-model="data_inicio" placeholder="data inicio" required class="h-10 my-2 ml-2 p-2 font-bold text-center border-2 rounded-lg w-1/6">
      <label class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto">Data Fim</label>
      <input type="date" name="data_fim" v-model="data_fim" placeholder="data fim" required class="h-10 my-2 ml-2 p-2 font-bold text-center border-2 rounded-lg w-1/6">
      <br>
      <input type="text" name="external_id" placeholder="ID externo" required v-model="external_id" class="h-10 m-2 p-2 font-bold text-center border-2 rounded-lg w-1/12">
      <input type="file" accept="image/png, image/gif, image/jpeg" class="h-10 m-2 p-2 font-bold text-center border-2 rounded-lg w-10/12 file:hidden"
             @change="$event.target.files[0].size < 1048576 ? photo_url = $event.target.files[0] : (() => { toast.error('Photo is to big!'); $event.target.value = null })()">
    </form>
</template>