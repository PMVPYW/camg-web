<script setup>
import {ref, watch} from "vue";

const props = defineProps(["obj_to_delete"])
const emit = defineEmits(["delete", "cancel"])




const deleteEntity = () => {

  emit('delete');
}

const cancelDeletion = () => {
  emit('cancel')
}
</script>

<template>
  <form class="m-2 w-full text-center flex justify-center">
    <div class="w-1/2 border-4 rounded-lg">
      <p class="font-bold">Eliminar {{obj_to_delete.nome}}?</p>
      <button @click.prevent="cancelDeletion" class="mx-4 my-2 px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 hover:border-2 border-green-800  text-white">Não</button>
      <button @click.prevent="deleteEntity" class="mx-4 my-2 px-4 py-2 rounded-lg bg-red-800 hover:bg-red-700 hover:border-2 border-red-800 text-white">Sim</button>
    </div>

  </form>
</template>