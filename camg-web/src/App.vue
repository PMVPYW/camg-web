<script setup>
import Patrocinios from "@/components/Rallies/Patrocinios/PatrociniosList.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Aside from "@/components/Aside/Aside.vue";
import Footer from "@/components/Footer/Footer.vue";
import { useRouter } from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {useRallyStore} from "@/stores/rally.js"
import {useAlbumStore} from "@/stores/album.js"
import axios from "axios";
import {onMounted} from "vue";
import {usePatrocinioStore} from "@/stores/patrocinio.js";
import {useNoticiaStore} from "@/stores/noticia.js";
import {useFotoStore} from "@/stores/foto.js";
import {useContactoStore} from "@/stores/contacto.js";


const router = useRouter()
const userStore=useUserStore();
const rallyStore = useRallyStore();
const albumStore = useAlbumStore();
const fotoStore = useFotoStore();
const patrocinioStore = usePatrocinioStore();
const noticiaStore = useNoticiaStore();
const contactoStore = useContactoStore();

onMounted(async () => {
  await contactoStore.loadContactos({});
  await rallyStore.loadRallies();
  await patrocinioStore.loadPatrocinios({});
  await patrocinioStore.loadEntidades();
  await patrocinioStore.loadpatrocinosSemAssociacao();
  await albumStore.loadAlbuns();
  await fotoStore.loadFotos();
  await noticiaStore.loadNoticias({});
});
</script>

<template>
  <!-- Loopple Templates: https://www.loopple.com/templates | Copyright Loopple (https://www.loopple.com) | This copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. -->
  <div v-if="userStore.user">
    <Navbar></Navbar>
    <div class="bg-[#f8f9fe]">
      <div class="flex flex-row">
        <Aside></Aside>
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
  <div v-if="!userStore.user">
    <router-view></router-view>
  </div>
</template>
