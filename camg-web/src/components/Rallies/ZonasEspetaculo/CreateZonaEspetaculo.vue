<script setup>
import {useProvaStore} from "@/stores/prova.js";
import {useZonaEspetaculoStore} from "@/stores/zonaEspetaculo.js";
import {ref} from "vue";

const provaStore = useProvaStore();
const zonaEspetaculo = useZonaEspetaculoStore()
const props = defineProps(["coordenadas", "obj_to_edit", "errors"]);
const emit = defineEmits(["edit"]);


const nome = ref(props.obj_to_edit?.nome);
const nivel_afluencia = ref(props.obj_to_edit?.nivel_afluencia);
const facilidade_acesso = ref(props.obj_to_edit?.facilidade_acesso);
const distancia_estacionamento = ref(props.obj_to_edit?.distancia_estacionamento);
const nivel_ocupacao = ref(props.obj_to_edit?.nivel_ocupacao);
const coordenada = ref(props.obj_to_edit ? props.obj_to_edit?.coordenadas : props.coordenadas);
const prova_id = ref(null);

const errors = ref({})

const createZE = async () => {
  const obj = {
    "nome": nome.value,
    "nivel_afluencia": nivel_afluencia.value,
    "facilidade_acesso": facilidade_acesso.value,
    "distancia_estacionamento": distancia_estacionamento.value,
    "coordenadas": coordenada.value,
    "nivel_ocupacao": nivel_ocupacao.value,
  };
  if (prova_id.value != null) {
    obj["prova_id"] = prova_id.value
  }
  if(props.obj_to_edit){
    emit(props.obj_to_edit ? 'edit' : "", obj);
  }else{
    const result = await zonaEspetaculo.createZonaEspetaculo(obj);
    if (result) {
      errors.value = result;
      console.warn(errors.value, "errors_crud")
    }else{
      errors.value= {};
    }
  }

}
</script>
<template>
  <form class="m-2">
    <div class="flex flex-row justify-center w-full">
      <div class="w-9/12">
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Nome</label>
              <input v-model="nome" type="text" required  class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome Patrocinio">
              <h1 class="text-red-600 text-base font-medium">nome</h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Prova:</label>
              <select v-model="prova_id" class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option class="uppercase" v-for="prova in provaStore.provas" :value="prova.id">{{ prova.nome }}
                </option>
              </select>
              <h1  class="text-red-600 text-base font-medium">errors.prova</h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Coordenadas</label>
              <input type="text" v-model="coordenada" required  class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <h1  class="text-red-600 text-base font-medium">errors.coordenadas</h1>
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full mb-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Distância Estacionamento</label>
              <input v-model="distancia_estacionamento" type="number" required  class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Distância em metros">
              <h1 class="text-red-600 text-base font-medium">distancia_estacionamento</h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Facilidade Acesso</label>
              <select v-model="facilidade_acesso" class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option selected>Fácil</option>
                <option>Médio</option>
                <option>Difícil</option>
              </select>
              <h1 class="text-red-600 text-base font-medium">facilidade_acesso</h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Coordenadas</label>
              <input type="text" v-model="coordenada" required  class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <h1  class="text-red-600 text-base font-medium">errors.coordenadas</h1>
            </div>
          </div>
        </div>
        <div  class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-11/12">
            <div>
              <label class="block mb-2 text-base font-medium">Nivel Afluência</label>
              <select v-model="nivel_afluencia" class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option selected>Fácil</option>
                <option>Médio</option>
                <option>Difícil</option>
              </select>
              <!--              <h1 class="text-red-600 text-base font-medium">nivel_afluencia</h1>-->
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Nivel Ocupação</label>
              <select v-model="nivel_ocupacao" class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option selected>Livre</option>
                <option>Intermédio</option>
                <option>Completo</option>
              </select>
              <!--              <h1 class="text-red-600 text-base font-medium">nivel_afluencia</h1>-->
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Coordenadas</label>
              <input type="text" v-model="coordenada" required  class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <h1  class="text-red-600 text-base font-medium">errors.coordenadas</h1>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button type="button"
                  @click="createZE"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            Criar
          </button>
        </div>
      </div>

    </div>
  </form>

</template>