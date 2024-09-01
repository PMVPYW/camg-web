<script setup>
import { ref, watch } from "vue";
import { useRallyStore } from "@/stores/rally.js";

const props = defineProps(["obj_to_edit", "errors", "editing"]);
const emit = defineEmits(["create", "edit"]);

const rallyStore = useRallyStore();

const nome = ref(props.obj_to_edit?.nome);
const rally_id = ref(
  props.obj_to_edit?.rally_id ? props.obj_to_edit?.rally_id : null,
);
const img = ref(null);

const errors = ref(props.errors ?? {});

watch(
  () => props.errors,
  (n_errors) => {
    errors.value = n_errors;
  },
);

const emitAlbum = () => {
  const obj = {
    nome: nome.value,
    rally_id: rally_id.value,
  };
  if (img.value != null) {
    obj["img"] = img.value;
  }
  emit(props.obj_to_edit && props.editing === true ? "edit" : "create", obj);
};
</script>

<template>
  <hr class="my-6">
  <form class="m-2">
    <div class=" flex flex-col w-full items-center">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-9/12">
        <div>
          <label class="block mb-2 text-base font-medium">Nome<label class="text-red-600 ml-1">*</label></label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do Álbum"
            required
            v-model="nome"
            class="text-sm py-3 px-4 mb-2 text-center bg-gray-100 rounded-lg border border-amber-200 focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-full"
          />
          <h1 v-if="errors.nome" class="ml-2 text-red-600 text-base font-medium">{{ errors.nome[0] }}</h1>
        </div>
        <div>
          <label class="block mb-2 text-base font-medium">Rally</label>
          <select
            v-model="rally_id"
            class="text-sm py-3 px-4 text-center bg-gray-100 rounded-lg border border-amber-200 focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-full"
          >
            <option :value="null">Nenhum</option>
            <option v-for="rally in rallyStore.rallies" :value="rally.id">
              {{ rally.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-9/12 mt-6">
        <label class="block mb-2 text-base font-medium">Capa do Álbum</label>
        <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            class="text-sm py-3 px-4 text-center bg-gray-100 rounded-lg border border-amber-200 focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-full file:hidden"
            @change="
            $event.target.files[0].size < 1048576
              ? (img = $event.target.files[0])
              : (() => {
                 toast.error('Photo is too big!');
                 $event.target.value = null;
               })()
          "
        />
      </div>
      <div class="w-9/12 my-4">
        <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
      </div>
    <div class="flex justify-center w-full mt-8">
      <input
        type="submit"
        @click.prevent="emitAlbum"
        class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
        :value="
          props.obj_to_edit && props.editing === true ? 'Editar' : 'Criar'
        "
      />
    </div>
    <div
      class="w-full text-red-600 font-bold mx-auto text-center items-top justify-center flex"
    >
      <!--second line of errors-->
      <div v-if="errors.img" class="w-7/12 inline-block">{{ errors.img[0] }}</div>
      <div class="w-3/12 inline-block"></div>
    </div>
    </div>
  </form>
  <hr class="my-6">
</template>
