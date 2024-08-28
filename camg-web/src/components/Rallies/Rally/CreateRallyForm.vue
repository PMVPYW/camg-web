<script setup>
import { ref, watch } from "vue";

const props = defineProps(["obj_to_edit", "errors", "editing"]);
const emit = defineEmits(["create", "edit"]);

const nome = ref(props.obj_to_edit?.nome);
const data_inicio = ref(props.obj_to_edit?.data_inicio);
const data_fim = ref(props.obj_to_edit?.data_fim);
const external_id = ref(props.obj_to_edit?.external_entity_id);
const photo_url = ref(null);
const errors = ref(props.errors ?? {});

watch(
  () => props.errors,
  (n_errors) => {
    errors.value = n_errors ?? {};
  },
);

watch(external_id, (new_external_id, oldValue) => {
  external_id.value = new_external_id.replace(/\D/g, "");
});

const emitRally = () => {
  const obj = {
    nome: nome.value,
    data_inicio: data_inicio.value,
    data_fim: data_fim.value,
    external_entity_id: external_id.value,
  };
  if (photo_url.value != null) {
    obj["photo_url"] = photo_url.value;
  }
  emit(props.obj_to_edit && props.editing === true ? "edit" : "create", obj);
};
</script>

<template>
  <form class="m-2">
    <div class="flex flex-row w-full justify-center">
      <div class="w-1/2 mx-2">
        <label
          class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto"
          >Nome:</label
        >
        <input
          type="text"
          name="nome"
          placeholder="Nome do rally"
          required
          v-model="nome"
          class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"
        />
        <h1
          v-if="errors.nome"
          class="ml-2 text-red-600 text-base font-medium"
        >
          {{ errors.nome[0] }}
        </h1>
      </div>
      <div class="w-1/6 mx-2">
        <label
          class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto"
          >Data Inicio:</label
        >
        <input
          type="date"
          name="data_inicio"
          v-model="data_inicio"
          placeholder="data inicio"
          required
          class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"
        />
        <h1
          v-if="errors.data_inicio"
          class="ml-2 text-red-600 text-base font-medium"
        >
          {{ errors.data_inicio[0] }}
        </h1>
      </div>
      <div class="w-1/6 mx-2">
        <label
          class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto"
          >Data Fim:</label
        >
        <input
          type="date"
          name="data_fim"
          v-model="data_fim"
          placeholder="data fim"
          required
          class="text-sm h-10 my-2 ml-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"
        />
        <h1
          v-if="errors.data_fim"
          class="ml-2 text-red-600 text-base font-medium"
        >
          {{ errors.data_fim[0] }}
        </h1>
      </div>
    </div>
    <br />
    <div class="flex flex-row justify-center w-full">
      <div class="w-2/12 mx-2">
        <label
          class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto"
          >ID Externo:</label
        >
        <input
          type="text"
          name="external_id"
          placeholder="ID externo"
          required
          v-model="external_id"
          class="text-sm h-10 m-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full"
        />
        <h1
          v-if="errors.external_entity_id"
          class="ml-2 text-red-600 text-base font-medium"
        >
          {{ errors.external_entity_id[0] }}
        </h1>
      </div>
      <div class="w-6/12 mx-2">
        <label
          class="h-10 my-2 ml-2 p-2 font-bold text-center rounded-lg w-auto"
          >Imagem:</label
        >
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          class="text-sm h-10 m-2 p-2 text-center border border-gray-300 bg-gray-100 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none w-full file:hidden"
          @change="
            $event.target.files[0].size < 1048576
              ? (photo_url = $event.target.files[0])
              : (() => {
                 toast.error('Photo is too big!');
                 $event.target.value = null;
               })()
          "
        />
        <h1
          v-if="errors.photo_url"
          class="ml-2 text-red-600 text-base font-medium"
        >
          {{ errors.photo_url[0] }}
        </h1>
      </div>
      <div class="w-1/6 mx-2">
        <input
          type="submit"
          @click.prevent="emitRally"
          class="opacity-85 text-center w-full m-2 mt-8 py-2 px-4 gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
          :value="
            props.obj_to_edit && props.editing === true
              ? 'Editar'
              : 'Criar'
          "
        />
      </div>
    </div>
  </form>
</template>
