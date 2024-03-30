<script setup>
import Patrocinios from "@/components/Rallies/Patrocinios/Patrocinios.vue";
import Navbar from "@/components/Navbar/Navbar.vue";
import Aside from "@/components/Aside/Aside.vue";
import Footer from "@/components/Footer/Footer.vue";
import { useRouter } from "vue-router";
import {useUserStore} from "@/stores/user.js";
import axios from "axios";
import {onMounted} from "vue";

const router = useRouter()
const userStore=useUserStore();

onMounted(async () => {
  let script = document.createElement("script");
  script.src = "https://cdn.lordicon.com/lordicon.js";
  script.async = true;
  document.body.appendChild(script);
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common.Authorization = "Bearer " + token;
      userStore.user=true;
    } else {
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }

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
