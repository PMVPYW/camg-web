<script setup>
import { useProvaStore } from "@/stores/prova.js";
import { useZonaEspetaculoStore } from "@/stores/zonaEspetaculo.js";
import { ref, watch } from "vue";

const provaStore = useProvaStore();
const zonaEspetaculo = useZonaEspetaculoStore();
const props = defineProps(["coordenadas", "obj_to_edit", "errors", "editing"]);
const emit = defineEmits(["edit", "create"]);

const nome = ref(props.obj_to_edit?.nome);
const nivel_afluencia = ref(props.obj_to_edit?.nivel_afluencia);
const facilidade_acesso = ref(props.obj_to_edit?.facilidade_acesso);
const distancia_estacionamento = ref(
  props.obj_to_edit?.distancia_estacionamento,
);
const nivel_ocupacao = ref(props.obj_to_edit?.nivel_ocupacao);
const coordenada = ref(
  props.obj_to_edit ? props.obj_to_edit?.coordenadas : props.coordenadas,
);
const prova_id = ref(props.obj_to_edit?.prova?.id ?? null);
const info = ref(props.obj_to_edit?.info ?? null);

const errors = ref(props.errors ?? {});

watch(
  () => props.errors,
  (n_errors) => {
    errors.value = n_errors ?? {};
  },
);

console.log("errors", errors);

const createZE = async () => {
  const obj = {
    nome: nome.value,
    nivel_afluencia: nivel_afluencia.value,
    facilidade_acesso: facilidade_acesso.value,
    distancia_estacionamento: distancia_estacionamento.value,
    coordenadas: coordenada.value,
    nivel_ocupacao: nivel_ocupacao.value,
    info: info.value,
  };
  if (prova_id.value != null) {
    obj["prova_id"] = prova_id.value;
  }
  emit(props.obj_to_edit && props.editing === true ? "edit" : "create", obj);
};
</script>
<template>
  <hr class="my-6">
  <form class="m-2">
    <div class="flex flex-row justify-center w-full">
      <div class="w-9/12">
        <div class="flex justify-center w-full">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12"
          >
            <div>
              <label class="block mb-2 text-base font-medium"
                >Nome</label
              >
              <input
                v-model="nome"
                type="text"
                required
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
                placeholder="Nome Zona de Espetáculo"
              />
              <h1
                v-if="errors.nome"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.nome[0] }}
              </h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium"
                >Prova</label
              >
              <select
                v-model="prova_id"
                class="font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              >
                <option v-for="prova in provaStore.provas"
                  :value="prova.id"
                >
                  {{ prova.nome }}
                </option>
              </select>
              <h1
                v-if="errors.prova_id"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.prova_id[0] }}
              </h1>
            </div>
          </div>
        </div>
        <br />
        <div class="flex justify-center w-full mb-4">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12"
          >
            <div>
              <label class="block mb-2 text-base font-medium"
                >Distância Estacionamento</label
              >
              <input
                v-model="distancia_estacionamento"
                type="number"
                required
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
                placeholder="Distância em metros"
              />
              <h1
                v-if="errors.distancia_estacionamento"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.distancia_estacionamento[0] }}
              </h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium"
                >Facilidade Acesso</label
              >
              <select
                v-model="facilidade_acesso"
                class="font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              >
                <option selected>Fácil</option>
                <option>Médio</option>
                <option>Difícil</option>
              </select>
              <h1
                v-if="errors.facilidade_acesso"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.facilidade_acesso[0] }}
              </h1>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12"
          >
            <div>
              <label class="block mb-2 text-base font-medium"
                >Nivel Afluência</label
              >
              <select
                v-model="nivel_afluencia"
                class="font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              >
                <option selected>Baixo</option>
                <option>Médio</option>
                <option>Alto</option>
              </select>
              <h1
                v-if="errors.nivel_afluencia"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.nivel_afluencia[0] }}
              </h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium"
                >Nivel Ocupação</label
              >
              <select
                v-model="nivel_ocupacao"
                class="font-bold py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              >
                <option selected>Livre</option>
                <option>Intermédio</option>
                <option>Completo</option>
              </select>
              <h1
                v-if="errors.nivel_ocupacao"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.nivel_ocupacao[0] }}
              </h1>
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full my-4">
          <div class="w-11/12">
            <label class="block mb-2 text-base font-medium"
              >Coordenadas</label
            >
            <textarea
              type="text"
              v-model="coordenada"
              required
              class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
            ></textarea>
            <h1
              v-if="errors.coordenadas"
              class="text-red-600 text-base font-medium"
            >
              {{ errors.coordenadas[0] }}
            </h1>
          </div>
        </div>
        <div class="flex justify-center w-full my-4">
          <div class="w-11/12">
            <label class="block mb-2 text-base font-medium"
              >Informação Adicional</label
            >
            <textarea
              type="text"
              v-model="info"
              required
              class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
            ></textarea>
            <h1
              v-if="errors.info"
              class="text-red-600 text-base font-medium"
            >
              {{ errors.info[0] }}
            </h1>
          </div>
        </div>
        <div class="flex justify-center w-full">
          <button
            type="button"
            @click="createZE"
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
