<script setup>
    import {ref} from "vue";

    const props = defineProps(["create_callback", "create_form", "delete_callback", "edit_callback"])
    const creating = ref(false);
</script>

<template>
  <div class="border-4 w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
    <div class="flex justify-center mx-auto bg-[#f8f9fe] w-full h-16 ">
      <button @click="()=>{creating = !creating;props.create_callback}" type="button" class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {{creating ? 'Cancelar' : 'Criar'}}
      </button>
      <button @click="props.delete_callback" type="button" class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Eliminar
      </button>
      <button @click="props.edit_callback" type="button" class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Editar
      </button>
    </div>
    <div class="mx-auto w-full items-center">
      <create_form v-if="creating"></create_form>
    </div>
  </div>
</template>