<script setup>
import {ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";

const props = defineProps(["obj_to_edit", "errors"])
const emit = defineEmits(["create", "edit"])

const rallyStore = useRallyStore();

const nome = ref(props.obj_to_edit?.nome);
const rally_id = ref(props.obj_to_edit?.rally_id ? props.obj_to_edit?.rally_id : null);
const img = ref(null);


const emitAlbum = () => {
  const obj = {
    "nome": nome.value,
    "rally_id": rally_id.value,
  };
  if (img.value != null) {
    obj["img"] = img.value
  }
  emit(props.obj_to_edit ? 'edit' : "create", obj);
}
</script>

<template>
  <form class="m-2">
      <input type="text" name="nome" placeholder="Nome do album" required v-model="nome"
             class="h-10 m-2 p-2 font-bold text-center border-2 rounded-lg w-1/2">
     <select v-model="rally_id" class="h-10 m-2 p-2 font-bold text-center border-2 rounded-lg w-5/12 bg-white">
       <option :value="null">Nenhum</option>
       <option v-for="rally in rallyStore.rallies" :value="rally.id">{{rally.nome}}</option>
     </select>
    <br>

    <div class="w-full text-red-600 font-bold items-top flex mx-2" v-if="Object.keys(errors ?? {}).length">
      <!--first line of errors-->
      <div class="w-1/2 text-center inline-block">{{ errors.nome }}</div>
      <div class="w-1/12  inline-block"></div>
    </div>
    <br>
      <input type="file" accept="image/png, image/gif, image/jpeg"
             class="h-10 m-2 p-2 font-bold text-center border-2 rounded-lg w-8/12 file:hidden"
             @change="$event.target.files[0].size < 1048576 ? img = $event.target.files[0] : (() => { toast.error('Photo is too big!'); $event.target.value = null })()">
      <input type="submit"
             @click.prevent="emitAlbum"
             class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
             :value="props.obj_to_edit ? 'Editar' : 'Criar'"/>
    <div class="w-full text-red-600 font-bold mx-auto text-center items-top justify-center flex">
      <!--second line of errors-->
      <div class="w-7/12 inline-block">{{ errors.img }}</div>
      <div class="w-3/12 inline-block"></div>

    </div>
  </form>
</template>