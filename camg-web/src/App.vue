<script setup>
import Patrocinios from "@/components/Rallies/Patrocinios/PatrociniosList.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Aside from "@/components/Aside/Aside.vue";
import Footer from "@/components/Footer/Footer.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useRallyStore } from "@/stores/rally.js";
import { useAlbumStore } from "@/stores/album.js";
import axios from "axios";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
import { usePatrocinioStore } from "@/stores/patrocinio.js";
import { useNoticiaStore } from "@/stores/noticia.js";
import { useFotoStore } from "@/stores/foto.js";
import { useContactoStore } from "@/stores/contacto.js";
import { useProvaStore } from "@/stores/prova.js";
import { usePatrocinioOficialStore } from "@/stores/patrocinioOficial.js";
import { useHorarioStore } from "@/stores/horario.js";
import { useZonaEspetaculoStore } from "@/stores/zonaEspetaculo.js";
import { useStatsStore } from "./stores/stats";
import {useDeclaracaoStore} from "@/stores/declaracao.js";
import {useConselhoSegurancaStore} from "@/stores/conselho_seguranca.js";
import {useHistoriaStore} from "@/stores/historia.js";
import {useDiretoStore} from "@/stores/direto.js";

const router = useRouter();
const userStore = useUserStore();
const rallyStore = useRallyStore();
const albumStore = useAlbumStore();
const fotoStore = useFotoStore();
const patrocinioStore = usePatrocinioStore();
const noticiaStore = useNoticiaStore();
const contactoStore = useContactoStore();
const provaStore = useProvaStore();
const patrocinioOficial = usePatrocinioOficialStore();
const horarioStore = useHorarioStore();
const zonaEspetaculoStore = useZonaEspetaculoStore();
const statsStore = useStatsStore();//n remover; inicialização de outra store iternamente, sem isto, algumas estatiscas podem não funcionar
const declaracaoStore = useDeclaracaoStore();
const conselhoSegurancaStore = useConselhoSegurancaStore();
const historiaStore = useHistoriaStore();
const diretoStore = useDiretoStore();

onMounted(async () => {
  await rallyStore.loadRallies();
  await zonaEspetaculoStore.loadZonaEspetaculo({});
  await provaStore.loadProvas({})
  await contactoStore.loadContactos({});
  await contactoStore.loadTipoContactos({});
  await patrocinioStore.loadPatrocinios({});
  await patrocinioStore.loadEntidades();
  await patrocinioStore.loadpatrocinosSemAssociacao();
  await patrocinioOficial.loadPatrociniosOficiais({});
  await patrocinioOficial.loadEntidadesOficiais();
  await patrocinioOficial.loadpatrocinosOficiaisSemAssociacao();
  await albumStore.loadAlbuns();
  await fotoStore.loadFotos();
  await noticiaStore.loadNoticias({});
  await horarioStore.loadHorarios();
  await declaracaoStore.loadDeclaracoes({});
  await conselhoSegurancaStore.loadConselhosSeguranca();
  await historiaStore.loadHistorias({});
  await diretoStore.loadDiretos({});

  if (userStore.user != null) {
        await userStore.loadAdmins();
    }
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
