<script setup>
import {ref, watch} from "vue";
import {data} from "autoprefixer";

const props = defineProps({
  create_callback: Function,
  create_form: Object,
  delete_callback: Function,
  edit_callback: Function,
  obj_to_edit: Object,
  delete_form: Object,
  create_visible: {
    type: Boolean,
    default: true
  },
  update_visible: {
    type: Boolean,
    default: true
  },
  delete_visible: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(["clearSelected"]);
const creating = ref(false);
const editing = ref(false)
const deleting = ref(false)
const errors = ref({});

const obj_to_edit_cpy = ref(props.obj_to_edit);

watch(() => props.obj_to_edit, (new_obj) => {
  obj_to_edit_cpy.value = {...new_obj}
  if (editing.value) {
    togleEditing();
    setTimeout(togleEditing, 0);
  }

})


const togleCreating = () => {
  editing.value = false;
  creating.value = !creating.value;
  deleting.value = false
  //clearSelected();
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

const clearSelected = () => {
  emit("clearSelected");
}

const createEntity = (data) => {
  const result = props.create_callback(data);
  result.then(response => {
    if (response === true) {
      errors.value = {}
      togleCreating();
    } else {
      errors.value = response;
      console.warn(errors.value, "errors_crud")
    }
  })
}

const editEntity = (data) => {
  const result = props.edit_callback(data, obj_to_edit_cpy.value.id);
  result.then(response => {
    if (response === true) {
      errors.value = {}
      togleEditing();
      clearSelected();
    } else {
      errors.value = response;
    }
  })
}

const deleteEntity = () => {
  const result = props.delete_callback(obj_to_edit_cpy.value.id);
  result.then(response => {
    if (response === true) {
      errors.value = {}
    } else {
      errors.value = response;
    }
    togleDeleting();
    clearSelected()
  })
}

</script>

<template>
  <div class="w-11/12 my-8 rounded-lg justify-center mx-auto bg-[#f8f9fe]">
    <div class="flex justify-center mx-auto bg-[#f8f9fe] w-full h-16 text">
      <button v-if="props.create_visible" @click="togleCreating" type="button"
              class="md:w-3/12 sm:w-full text-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-20 shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600 justify-center">
        {{ creating ? 'Cancelar' : 'Criar' }}
      </button>
      <button  v-if="props.delete_visible" @click="togleDeleting" type="button"
              :disabled="!obj_to_edit_cpy.id"
              class="md:w-3/12 sm:w-full justify-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-red-800 border-red-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
        {{ deleting ? 'Cancelar' : 'Eliminar' }}
      </button>
      <button v-if="props.update_visible" @click="togleEditing" type="button" :disabled="!obj_to_edit_cpy.id"
              class="md:w-3/12 sm:w-full justify-center opacity-85 my-2 mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-slate-900 border-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600">
        {{ editing ? 'Cancelar' : 'Editar' }}
      </button>
    </div>
    <div class="mx-auto w-full items-center">
      <create_form @create="(data)=>createEntity(data)"
                   v-if="creating"
      :errors="errors"></create_form>
      <create_form @edit="(data)=>editEntity(data)"
                   :obj_to_edit="{...obj_to_edit_cpy}"
                   v-if="editing && Object.keys(obj_to_edit_cpy).length != 0"
                   :errors="errors"
      ></create_form>
      <delete_form @delete="deleteEntity"
                   @cancel="togleDeleting"
                   :obj_to_delete="{...obj_to_edit_cpy}"
                   v-if="deleting && Object.keys(obj_to_edit_cpy).length != 0"
      ></delete_form>
    </div>
  </div>
</template>