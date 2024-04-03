<script setup>
import {ref, watch} from "vue";

const props = defineProps(["create_callback", "create_form", "delete_callback", "edit_callback", "obj_to_edit"])
const creating = ref(false);
const editing = ref(false)
const deleting = ref(false)

const obj_to_edit_cpy = ref(props.obj_to_edit);

const togleCreating = () => {
  editing.value = false;
  creating.value = !creating.value;
  deleting.value = false
}
const togleEditing = () => {
  editing.value = !editing.value;
  creating.value = false;
  deleting.value = false;
}
const togleDeleting = () => {
  editing.value = false;
  creating.value = false;
  deleting.value = !deleting.value
}

watch(() => props.obj_to_edit, (new_obj) => {
  obj_to_edit_cpy.value = {...new_obj}
  if (editing.value)
  {
    togleEditing();
    setTimeout(togleEditing, 0);
  }

})
</script>

<template>
  <div class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
    <div class="flex justify-center mx-auto bg-[#f8f9fe] w-full h-16 ">
      <button @click="togleCreating" type="button"
              class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {{ creating ? 'Cancelar' : 'Criar' }}
      </button>
      <button @click="()=>{togleDeleting(); props.delete_callback(obj_to_edit_cpy.id)}" type="button" :disabled="!obj_to_edit_cpy.id"
              class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-red-800 dark:border-red-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        Eliminar
      </button>
      <button @click="togleEditing" type="button" :disabled="!obj_to_edit_cpy.id"
              class="opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
        {{ editing ? 'Cancelar' : 'Editar' }}
      </button>
    </div>
    <div class="mx-auto w-full items-center">
      <create_form @create="(data)=>{togleCreating();props.create_callback(data);creating = false}"
                   v-if="creating"></create_form>
      <create_form @edit="(data)=>{togleEditing();props.edit_callback(data, obj_to_edit_cpy.id);editing = false;}"
                   :obj_to_edit="{...obj_to_edit_cpy}" v-if="editing && obj_to_edit_cpy"></create_form>
    </div>
  </div>
</template>