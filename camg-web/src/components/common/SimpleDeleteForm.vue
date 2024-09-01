<script setup>
import {ref, watch} from "vue";

const props = defineProps(["obj_to_delete", 'bg'])
const emit = defineEmits(["delete", "cancel"])




const deleteEntity = () => {

 emit('delete');
}

const cancelDeletion = () => {
 emit('cancel')
}
</script>

<template>
  <hr class="my-6">
  <form class="m-2 w-full text-center flex justify-center mt-6">
  <div class="w-1/2 rounded-lg" :class="{[`bg-${props.bg}`] : true}">
   <p class="mb-2 text-lg flex flex-row justify-center">Tem a certeza que pretende remover&nbsp;<h1 v-if="obj_to_delete.nome || obj_to_delete.titulo">"<b>{{obj_to_delete.nome ? obj_to_delete.nome : obj_to_delete.titulo}}</b>"&nbsp;</h1>?</p>
   <button @click.prevent="cancelDeletion" class="mx-4 my-2 px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 hover:border-2 border-green-800 text-white">Não</button>
   <button @click.prevent="deleteEntity" class="mx-4 my-2 px-4 py-2 rounded-lg bg-red-800 hover:bg-red-700 hover:border-2 border-red-800 text-white">Sim</button>
  </div>
 </form>
 <hr class="my-6">
</template>