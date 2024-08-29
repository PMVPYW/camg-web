<script setup>
import { useContactoStore } from "@/stores/contacto.js";
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";

const contactoStore = useContactoStore();

const props = defineProps(["obj_to_edit", "errors", "editing"]);
const emit = defineEmits(["create", "edit"]);

const nome = ref(props.obj_to_edit?.nome);
const valor = ref(props.obj_to_edit?.valor);
const tipocontacto_id = ref(props.obj_to_edit?.tipocontacto_id);
const tipo_valor = ref(props.obj_to_edit?.tipo_valor);
const errors = ref(props.errors ?? {});

watch(
  () => props.errors,
  (n_errors) => {
    errors.value = n_errors ?? {};
  },
);

const emitNew = () => {
  const obj = {
    nome: nome.value,
    valor: valor.value,
    tipocontacto_id: tipocontacto_id.value,
    tipo_valor: tipo_valor.value,
  };
  emit(props.obj_to_edit && props.editing ? "edit" : "create", obj);
};
</script>
<template>
  <hr class="my-6">
  <form class="m-2">
    <div class="flex flex-row">
      <div class="w-full">
        <div class="flex justify-center w-full">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-9/12"
          >
            <div>
              <label class="block mb-2 text-base font-medium"
                >Nome:</label
              >
              <input
                type="text"
                required
                v-model="nome"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
                placeholder="Nome Contacto"
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
                >Valor:</label
              >
              <input
                type="text"
                required
                v-model="valor"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
                placeholder="Valor"
              />
              <h1
                v-if="errors.valor"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.valor[0] }}
              </h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium"
                >Tipo de Contacto:</label
              >
              <select
                v-model="tipocontacto_id"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              >
                <option
                  v-for="tipoContacto in contactoStore.tipo_contactos"
                  :value="tipoContacto.id"
                >
                  {{ tipoContacto.nome }}
                </option>
              </select>
              <h1
                v-if="errors.tipocontacto_id"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.tipocontacto_id[0] }}
              </h1>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium"
                >Tipo:</label
              >
              <select
                v-model="tipo_valor"
                class="py-3 px-4 block w-full border border-amber-200 bg-gray-100 rounded-lg text-sm focus:border-amber-400 focus:ring-amber-500"
              >
                <option value="Fax">
                  Fax
                </option>
                <option value="Email">
                  Email
                </option>
                <option value="Telefone">
                  Telefone
                </option>
                <option value="Telemovel">
                  Telemóvel
                </option>
                <option value="Instagram">
                  Instagram
                </option>
                <option value="Facebook">
                  Facebook
                </option>
                <option value="Twitter">
                  Twitter
                </option>
                <option value="Morada">
                  Morada
                </option>
                <option value="Coordenadas">
                  Coordenadas
                </option>
                <option value="PaginaWeb">
                  Página Web
                </option>
                <option value="WhatsApp">
                  WhatsApp
                </option>
              </select>
              <h1
                v-if="errors.tipo_valor"
                class="text-red-600 text-base font-medium"
              >
                {{ errors.tipo_valor[0] }}
              </h1>
            </div>
          </div>
        </div>
        <br />
        <div class="flex justify-center w-full mt-8">
          <input
            type="submit"
            @click.prevent="emitNew"
            class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
            :value="
              props.obj_to_edit && props.editing == true
                ? 'Editar'
                : 'Criar'
            "
          />
        </div>
      </div>
    </div>
  </form>
  <hr class="my-6">
</template>
