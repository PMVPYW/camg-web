<script setup>

import {useContactoStore} from "@/stores/contacto.js";
import {ref} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";

const contactoStore=useContactoStore();

const props = defineProps(["obj_to_edit"]);
const emit = defineEmits(["create", "edit"]);

const nome = ref(props.obj_to_edit?.nome);
const valor = ref(props.obj_to_edit?.valor);
const tipocontacto_id = ref(props.obj_to_edit?.tipocontacto_id);
const tipo_valor = ref(props.obj_to_edit?.tipo_valor);





const emitNew = () => {
  const obj = {
    "nome": nome.value,
    "valor": valor.value,
    "tipocontacto_id": tipocontacto_id.value,
    "tipo_valor": tipo_valor.value,

  };
  emit(props.obj_to_edit ? 'edit' : "create", obj);
}
</script>
<template>
  <hr class="my-6">
  <form class="m-2">
    <div class="flex flex-row">
      <div class="w-full">
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-9/12">
            <div>
              <label class="block mb-2 text-base font-medium">Nome</label>
              <input type="text" required v-model="nome" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Nome Contacto">
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Valor</label>
              <input type="number" required v-model="valor" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm" placeholder="Valor">
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Tipo:</label>
              <select v-model="tipocontacto_id" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option v-for="tipoContacto in contactoStore.tipo_contactos" class="uppercase" :value="tipoContacto.id">{{tipoContacto.nome}}</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-base font-medium">Tipo de Contacto:</label>
              <select v-model="tipo_valor" class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm">
                <option class="uppercase" :value="Fax">Fax</option>
                <option class="uppercase" :value="Email">Email</option>
                <option class="uppercase" :value="Telefone">Telefone</option>
                <option class="uppercase" :value="Telemovel">Telemóvel</option>
                <option class="uppercase" :value="Instagram">Instagram</option>
                <option class="uppercase" :value="Facebook">Facebook</option>
                <option class="uppercase" :value="Twitter">Twitter</option>
                <option class="uppercase" :value="Morada">Morada</option>
                <option class="uppercase" :value="Coordenadas">Coordenadas</option>
                <option class="uppercase" :value="PaginaWeb">Página Web</option>
                <option class="uppercase" :value="WhatsApp">WhatsApp</option>
              </select>
            </div>
          </div>
        </div>
        <br>
        <div class="flex justify-center w-full mt-8">
          <button type="button"
                  @click.prevent="emitNew"
                  class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          Criar
          </button>
        </div>
      </div>
    </div>
  </form>
  <hr class="my-6">
</template>