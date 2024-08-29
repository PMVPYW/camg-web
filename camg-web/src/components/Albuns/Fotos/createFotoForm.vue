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
     <input type="text" name="nome" placeholder="Descrição das Fotos" required v-model="description"
         class="text-sm m-2 py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-1/2">
     <select disabled v-model="album_id" class="text-sm m-2 py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-5/12">
      <option :selected="true" :value="album.id">{{album.nome}}</option>
     </select>
    <br>

    <div class="w-full text-red-600 font-bold items-top flex mx-2" v-if="Object.keys(errors).length">
     <!--first line of errors-->
     <div v-if="errors.nome" class="w-1/2 text-center inline-block">{{ errors.nome[0] }}</div>
     <div class="w-1/12 inline-block"></div>
    </div>
    <br>
     <input multiple type="file" accept="image/png, image/gif, image/jpeg"
         class="text-sm m-2 py-3 px-4 text-center border border-amber-200 bg-gray-100 rounded-lg focus:border-amber-400 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none w-8/12 file:hidden"
         @change="image_src = props.obj_to_edit && props.editing ? $event.target.files[0] : $event.target.files">
     <input type="submit"
         @click.prevent="emitFoto"
         class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md shadow-sm disabled:opacity-50 disabled:pointer-events-none bg-green-800 border-green-600 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600"
         :value="props.obj_to_edit && props.editing ? 'Editar' : 'Criar'"/>
    <div class="w-full text-red-600 font-bold mx-auto text-center items-top justify-center flex">
     <!--second line of errors-->
     <div v-if="errors.image_src" class="w-7/12 inline-block">{{ errors.image_src[0] }}</div>
     <div class="w-3/12 inline-block"></div>

    </div>
   </form>
  <hr class="my-6">
</template>