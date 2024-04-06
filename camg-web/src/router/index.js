import { createRouter, createWebHistory } from "vue-router";
//import {useUserStore} from "@/stores/user.js";

//CAMG-WEB
import HomeView from "@/components/Dashboard/Dashboard.vue";
import Patrocinios from "@/components/Rallies/Patrocinios/Patrocinios.vue";
import Login from "@/views/Login.vue";
import Albuns from "@/components/Albuns/Albuns.vue";
import Contactos from "@/components/Contactos/Contactos.vue";
import ConselhosSeguranca from "@/components/Rallies/ConselhosSeguranca/ConselhosSeguranca.vue";
import Declarecoes from "@/components/Rallies/Declaracoes/Declarecoes.vue";
import Horarios from "@/components/Rallies/Horarios/Horarios.vue";
import Provas from "@/components/Rallies/Provas/Provas.vue";
import ZonasEspetaculo from "@/components/Rallies/ZonasEspetaculo/ZonasEspetaculo.vue";
import Noticias from "@/components/Noticias/Noticias.vue";
import Historias from "@/components/Historias/Historias.vue";
import OrgaosSociais from "@/components/OrgaosSociais/OrgaosSociais.vue";
import Rallies from "@/components/Rallies/Rallies.vue";
import {useUserStore} from "@/stores/user.js";

let handleFirstTime = true;

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/patrocinios",
            name: "patrocinios",
            component: Patrocinios,
        },
        {
            path: "/albuns",
            name: "albuns",
            component: Albuns,
        },
        {
            path: "/contactos",
            name: "contactos",
            component: Contactos,
        },
        {
            path: "/conselhos_seguranca",
            name: "conselhos_seguranca",
            component: ConselhosSeguranca,
        },
        {
            path: "/declaracoes",
            name: "declaracoes",
            component: Declarecoes,
        },
        {
            path: "/horarios",
            name: "horarios",
            component: Horarios,
        },
        {
            path: "/provas",
            name: "provas",
            component: Provas,
        },
        {
            path: "/zonas_espetaculo",
            name: "zonas_espetaculo",
            component: ZonasEspetaculo,
        },
        {
            path: "/noticias",
            name: "noticias",
            component: Noticias,
        },
        {
            path: "/historias",
            name: "historias",
            component: Historias,
        },
        {
            path: "/orgaos_sociais",
            name: "orgaos_sociais",
            component: OrgaosSociais,
        },
        {
            path: "/rallies",
            name: "rallies",
            component: Rallies,
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (handleFirstTime || !userStore.user) {
        await userStore.restoreToken();
        handleFirstTime = false;
    }
    console.log(userStore.user, handleFirstTime);
    if (to.name !== "login" && !userStore.user) {
        return next({ name: "login" });
    }
    if (to.name === "login" && userStore.user) {
        return next({ name: "home" });
    }

    next();
});

router.afterEach((to, from, failure) => {

});

export default router;
