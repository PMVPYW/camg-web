<script setup>
import Patrocinios from "@/components/Rallies/Patrocinios/PatrociniosList.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Aside from "@/components/Aside/Aside.vue";
import Footer from "@/components/Footer/Footer.vue";
import { useRouter } from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {useRallyStore} from "@/stores/rally.js"
import axios from "axios";
import {onMounted} from "vue";
import {usePatrocinioStore} from "@/stores/patrocinio.js";


const router = useRouter()
const userStore=useUserStore();
const rallyStore = useRallyStore();
const patrocinioStore = usePatrocinioStore();

onMounted(async () => {
  let script = document.createElement("script");
  script.src = "https://cdn.lordicon.com/lordicon.js";
  script.async = true;
  document.body.appendChild(script);
  await rallyStore.loadRallies();
  await patrocinioStore.loadPatrocinios();
  await patrocinioStore.loadEntidades();
  await patrocinioStore.loadpatrocinosSemAssociacao();

  setTimeout(() => {
    HSStaticMethods.autoInit();
  }, 100);
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
