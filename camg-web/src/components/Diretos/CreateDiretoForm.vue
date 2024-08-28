<script setup>
import {inject, onMounted, ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {useToast} from "vue-toastification";
import {Icon} from "@iconify/vue";
import {useDeclaracaoStore} from "@/stores/declaracao.js";

const props = defineProps(["obj_to_edit","errors", "editing"]);
const emit = defineEmits(["create", "edit"]);
const serverBaseUrl = inject("serverBaseUrl");
const toast = useToast;

const rallyStore = useRallyStore();

const nome = ref(props.obj_to_edit?.nome);
const link = ref(props.obj_to_edit?.link);
const rally_id = ref(null);

const errors = ref(props.errors ?? {})

watch(()=>props.errors, (n_errors)=>{
 errors.value = n_errors ?? {};
})


const emitNew = () => {
 const obj = {
  "nome": nome.value,
  "link": link.value,
 };
 if (rally_id.value != null) {
  obj["rally_id"] = rally_id.value;
 }
 emit(props.obj_to_edit && props.editing === true ? "edit" : "create", obj);
}



</script>
<template>
 <hr class="my-6">
 <form class="m-2">
  <div class="flex flex-row">
   <div class="w-full">
    <div class="flex flex-col items-center w-full">
     <div class="flex justify-center w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-8/12">
       <div>
        <label class="block mb-2 text-base font-medium">Nome:</label>
        <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome do direto">
        <h1 v-if="errors.nome" class="text-red-600 text-base font-medium">{{errors.nome[0]}}</h1>
       </div>
       <div>
        <label class="block mb-2 text-base font-medium">Rally</label>
        <select v-model="rally_id" class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
         <option :selected="rally_id === null"></option>
         <option v-for="rally in rallyStore.rallies" :value="rally.id">
          {{ rally.nome }}
         </option>
        </select>
       </div>
      </div>
     </div>
     <div class="w-8/12 mt-6">
       <label class="block mb-2 text-base font-medium">Link:</label>
       <input type="text" required v-model="link" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Link do direto">
       <h1 v-if="errors.link" class="text-red-600 text-base font-medium">{{errors.link[0]}}</h1>
     </div>
    </div>
    <br>
    <div class="flex justify-center w-full mt-8">
     <button
       type="button"
       @click="emitNew"
       class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
     >
      {{
       props.obj_to_edit && props.editing === true
         ? "Editar"
         : "Criar"
      }}
     </button>
    </div>
   </div>
  </div>
 </form>
 <hr class="my-6">
</template>