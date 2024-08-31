<script setup>
import {onMounted, ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";

const props = defineProps(["obj_to_edit", "errors", "editing"])
const emit = defineEmits(["create", "edit"])

const rallyStore = useRallyStore();
const albumStore = useAlbumStore();
const fotoStore = useFotoStore();

const description = ref(props.obj_to_edit?.description);
const album_id = ref(fotoStore.currentAlbum);
const image_src = ref(null);

const errors = ref(props.errors ?? {})

const album = ref(albumStore.albuns.find((album) => album.id == fotoStore.currentAlbum) ?? {});

watch(()=>props.errors, (n_errors)=>{
 errors.value = n_errors;
})

onMounted(()=>{
 album.value = albumStore.albuns.find((album) => album.id == fotoStore.currentAlbum) ?? {}
})

const emitFoto = () => {
 var img_src_value = "image_src" + (props.obj_to_edit && props.editing ? "" : "[]");
 var obj = {
  "description": description.value,
  "album_id": album_id.value,
 }
 obj[img_src_value] = image_src.value;
 emit(props.obj_to_edit && props.editing ? 'edit' : "create", obj);
}
</script>

<template>
  <hr class="my-6">
  <form class="m-2">
    <div class="flex flex-row">
      <div class="flex flex-col w-full items-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-9/12">
          <div>
            <label class="block mb-2 text-base font-medium">Descrição</label>
            <input type="text" name="nome" placeholder="Descrição das Fotos" required v-model="description"
               class="text-sm py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-full">
            <h1 v-if="errors.nome" class="w-1/2 text-center inline-block">{{ errors.nome[0] }}</h1>
          </div>
          <div>
            <label class="block mb-2 text-base font-medium">Nome do Álbum</label>
            <select disabled v-model="album_id" class="text-sm py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-full">
              <option :selected="true" :value="album.id">{{album.nome}}</option>
             </select>
          </div>
        </div>
        <div class="w-9/12 mt-6">
          <label class="block mb-2 text-base font-medium">Imagens<label class="text-red-600 ml-1">*</label></label>
          <input multiple type="file" accept="image/png, image/gif, image/jpeg"
               class="text-sm py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-full file:hidden"
               @change="image_src = props.obj_to_edit && props.editing ? $event.target.files[0] : $event.target.files">
          <h1 v-if="errors.image_src" class="ml-2 text-red-600 text-base font-medium">{{ errors.image_src[0] }}</h1>
        </div>
        <div class="w-9/12 mx-auto mt-4 px-2">
          <label class="block mb-2 text-base font-medium text-red-600">*<label class="text-red-600 ml-1">Campos Obrigatórios</label></label>
        </div>
        <div class="flex justify-center w-full">
         <input type="submit"
             @click.prevent="emitFoto"
             class="opacity-85 w-3/12 mt-8 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
             :value="props.obj_to_edit && props.editing ? 'Editar' : 'Criar'"/>
        </div>
      </div>
    </div>
   </form>
  <hr class="my-6">
</template>