<script setup xmlns="http://www.w3.org/1999/html">
import {computed, inject, ref, watch} from "vue";
import {useRallyStore} from "@/stores/rally.js";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useAlbumStore} from "@/stores/album.js";
import {useFotoStore} from "@/stores/foto.js";
import Dashboard from "@/components/Dashboard/Dashboard.vue";

const serverBaseUrl = inject("serverBaseUrl");

const props = defineProps(["obj_to_edit", "errors", "editing"]);
const emit = defineEmits(["create", "edit"]);

const titulo = ref(props.obj_to_edit?.titulo);
const conteudo = ref(props.obj_to_edit?.conteudo);
const title_img = ref(null);
const data = ref(
    props.obj_to_edit?.data
        ? props.obj_to_edit?.data
        : new Date().toISOString().substring(0, 10),
);
const rally_id = ref(null);
const album_selected = ref(false);
const fotos_selected = ref([]);

const rallyStore = useRallyStore();
const albumStore = useAlbumStore();
const fotoStore = useFotoStore();
const noticiaStore = useNoticiaStore();

const errors = ref(props.errors ?? {});

watch(
    () => props.errors,
    (n_errors) => {
      errors.value = n_errors ?? {};
    },
);

const emitNew = () => {
  const obj = {
    titulo: titulo.value,
    conteudo: conteudo.value,
    data: data.value,
  };
  if (title_img.value != null) {
    obj["title_img"] = title_img.value;
  }
  if (fotos_selected.length !== 0) {
    obj["fotos_id"] = fotos_selected.value;
  }
  if (rally_id.value != null) {
    obj["rally_id"] = rally_id.value;
  }
  emit(props.obj_to_edit && props.editing === true ? "edit" : "create", obj);
};

function removeElement(foto_id) {
  fotos_selected.value = fotos_selected.value.filter(
      (item) => item !== foto_id,
  );
}
</script>

<template>
  <form class="m-2">
    <div class="flex flex-row">
      <div class="w-full">
        <div class="lg:flex flex-row">
          <div class="flex flex-col justify-center w-5/6 mx-auto">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4"
            >
              <div>
                <label class="block mb-2 text-base font-medium"
                >Título</label
                >
                <input
                    type="text"
                    required
                    v-model="titulo"
                    class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                    placeholder="Titulo Noticia"
                />
                <h1
                    v-if="errors.titulo"
                    class="text-red-600 text-base font-medium"
                >
                  {{ errors.titulo[0] }}
                </h1>
              </div>
              <div>
                <label class="block mb-2 text-base font-medium"
                >Data</label
                >
                <input
                    type="date"
                    required
                    v-model="data"
                    class="py-3 px-4 block w-full border border-gray-300 bg-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Data"
                />
                <h1
                    v-if="errors.data"
                    class="text-red-600 text-base font-medium"
                >
                  {{ errors.data[0] }}
                </h1>
              </div>
            </div>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-11/12 my-4"
            >
              <div class="col-span-full">
                <label
                    for="about"
                    class="block mb-2 text-base font-medium"
                >Conteúdo</label
                >
                <div class="mt-2">
                                    <textarea
                                        id="about"
                                        required
                                        v-model="conteudo"
                                        rows="3"
                                        class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                                    ></textarea>
                </div>
                <h1
                    v-if="errors.conteudo"
                    class="text-red-600 text-base font-medium"
                >
                  {{ errors.conteudo[0] }}
                </h1>
              </div>
            </div>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full my-4"
            >
              <div class="mb-4 sm:mb-8 w-full">
                <label class="block mb-2 text-base font-medium"
                >Capa Notícia:</label
                >
                <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    class="py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm file:hidden"
                    @change="
                                        $event.target.files[0].size < 1048576
                                            ? (title_img =
                                                  $event.target.files[0])
                                            : (() => {
                                                  toast.error(
                                                      'Photo is too big!',
                                                  );
                                                  $event.target.value = null;
                                              })()
                                    "
                />
                <h1
                    v-if="errors.title_img"
                    class="text-red-600 text-base font-medium"
                >
                  {{ errors.title_img[0] }}
                </h1>
              </div>
              <div class="w-5/6">
                <label class="block mb-2 text-base font-medium"
                >Rally</label
                >
                <select
                    v-model="rally_id"
                    class="font-bold py-3 px-4 block w-full border border-gray-200 bg-gray-100 rounded-lg text-sm"
                >
                  <option
                      :selected="rally_id === null"
                  ></option>
                  <option
                      class="uppercase"
                      v-for="rally in rallyStore.rallies"
                      :value="rally.id"
                  >
                    {{ rally.nome }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="!props.editing" class="flex items-center">
              <input v-model="noticiaStore.noticias_createNotifications" type="checkbox" class="relative w-11 h-6 p-px bg-gray-300 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-amber-300 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-amber-300 checked:border-amber-300 focus:checked:border-amber-300
                before:inline-block before:size-5 before:bg-white checked:before:bg-amber-100 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 ">
              <label for="hs-small-switch" class="text-md text-gray-800 ms-3 font-bold">Enviar Notificações</label>
            </div>
          </div>
          <div
              v-if="Object.keys(fotoStore.fotos).length > 0"
              class="sm:block flex flex-col w-full h-full"
          >
            <div
                class="flex flex-row items-center m-2 justify-between"
            >
              <h1 v-if="fotos_selected.length">
                <b>{{ fotos_selected.length }}</b> Selecionado{{
                  fotos_selected.length != 1 ? "s" : ""
                }}
              </h1>
              <div class="flex flex-row">
                <label
                    class="block mb-2 text-base font-medium m-2"
                >Álbum:</label
                >
                <select
                    v-model="album_selected"
                    class="py-3 px-4 block w-35 border border-gray-200 bg-gray-100 rounded-lg text-sm"
                >
                  <option
                      :selected="album_selected === false"
                      :value="false"
                  >
                    Todos
                  </option>
                  <option
                      class="uppercase"
                      v-for="album in albumStore.albuns"
                      :value="album.id"
                  >
                    {{ album.nome }}
                  </option>
                </select>
              </div>
            </div>
            <div class="overflow-y-scroll h-96">
              <div
                  v-if="album_selected === false"
                  v-for="album_id in Object.keys(fotoStore.fotos)"
                  class="flex flex-wrap justify-center items-start"
              >
                <div
                    class="w-full border-b-2 border-b-amber-400 mx-auto my-1"
                >
                  <h1 class="text-base my-2 font-bold">
                    {{
                      albumStore.albuns.find(
                          (album) =>
                              album.id == album_id.nome,
                      )
                    }}
                  </h1>
                </div>
                <div
                    v-for="fotos in fotoStore.fotos[album_id]"
                    @click="
                                        () => {
                                            fotos_selected.includes(fotos.id)
                                                ? removeElement(fotos.id)
                                                : fotos_selected.push(fotos.id);
                                            console.log(fotos_selected);
                                        }
                                    "
                    :class="{
                                        'border-4 opacity-80':
                                            fotos_selected.includes(fotos.id),
                                    }"
                    class="flex bg-white w-[30%] min-w-36 max-w-48 h-36 m-2 border border-gray-300 rounded-xl"
                >
                  <img
                      :src="`${serverBaseUrl}/storage/fotos/${fotos.image_src}`"
                      :alt="`${serverBaseUrl}/storage/fotos/${fotos.image_src}`"
                      class="max-h-32 my-auto mx-auto min-w-24 shadow-soft-2xl"
                  />
                </div>
              </div>
              <div v-else>
                <div
                    class="flex flex-wrap justify-center items-start"
                >
                  <div
                      class="w-full border-b-2 border-b-amber-400 mx-auto my-1"
                  >
                    <h1 class="text-base my-2 font-bold">
                      {{
                        albumStore.albuns.find(
                            (album) =>
                                album.id ==
                                album_selected,
                        )?.nome
                      }}
                    </h1>
                  </div>
                  <div
                      v-if="
                                            fotoStore.fotos[album_selected]
                                                .length
                                        "
                  >
                    <div
                        v-for="fotos in fotoStore.fotos[
                                                album_selected
                                            ]"
                        @click="
                                                () => {
                                                    fotos_selected.includes(
                                                        fotos.id,
                                                    )
                                                        ? removeElement(
                                                              fotos.id,
                                                          )
                                                        : fotos_selected.push(
                                                              fotos.id,
                                                          );
                                                    console.log(fotos_selected);
                                                }
                                            "
                        :class="{
                                                'border-4 opacity-80':
                                                    fotos_selected.includes(
                                                        fotos.id,
                                                    ),
                                            }"
                        class="flex bg-white w-[30%] min-w-36 max-w-48 h-36 m-2 border border-gray-300 rounded-xl"
                    >
                      <img
                          :src="`${serverBaseUrl}/storage/fotos/${fotos.image_src}`"
                          :alt="`${serverBaseUrl}/storage/fotos/${fotos.image_src}`"
                          class="my-auto mx-auto min-w-24 shadow-soft-2xl"
                      />
                    </div>
                  </div>
                  <div
                      v-if="
                                            !fotoStore.fotos[album_selected]
                                                .length
                                        "
                  >
                    <h1
                        class="text-gray-800 text-base font-medium"
                    >
                      Álbum Sem Fotos
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="flex justify-center w-full">
          <button
              type="button"
              @click="emitNew"
              class="opacity-85 w-3/12 text-center justify-center mx-2 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
    <br>
  </form>
  <hr class="mt-5 mb-10">
</template>