import { createRouter, createWebHistory } from "vue-router";
//import {useUserStore} from "@/stores/user.js";

//CAMG-WEB
import HomeView from "@/components/Dashboard/Dashboard.vue";
import Patrocinios from "@/components/Rallies/Patrocinios/PatrociniosList.vue";
import Login from "@/views/Login.vue";
import Albuns from "@/components/Albuns/Albuns.vue";
import Contactos from "@/components/Contactos/Contactos.vue";
import ConselhosSeguranca from "@/components/ConselhosSeguranca/ConselhosSeguranca.vue";
import Declarecoes from "@/components/Rallies/Declaracoes/Declaracoes.vue";
import Horarios from "@/components/Rallies/Horarios/Horarios.vue";
import Provas from "@/components/Rallies/Provas/Provas.vue";
import ZonasEspetaculo from "@/components/Rallies/ZonasEspetaculo/ZonasEspetaculo.vue";
import Noticias from "@/components/Noticias/Noticias.vue";
import Historias from "@/components/Historias/Historias.vue";
import Rallies from "@/components/Rallies/Rallies.vue";
import {useUserStore} from "@/stores/user.js";
import Fotos from "@/components/Albuns/Fotos/Fotos.vue";
import Admins from "@/components/Admins/Admins.vue";
import Settings from "@/components/Settings/Settings.vue";
import Diretos from "@/components/Diretos/Diretos.vue";
import PatrociniosOficiais from "@/components/Rallies/PatrociniosOficiais/PatrociniosOficiais.vue";

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
            path: "/patrociniosOficiais",
            name: "patrociniosOficiais",
            component: PatrociniosOficiais,
        },
        {
            path: "/albuns",
            name: "albuns",
            component: Albuns,
        },
        {
            path: "/albuns/:id/fotos",
            name: "fotos",
            component: Fotos,
            props: route => ({ id: route.params.id})
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
            path: "/pecs",
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
            path: "/diretos",
            name: "diretos",
            component: Diretos,
        },
        {
            path: "/rallies",
            name: "rallies",
            component: Rallies,
        },
        {
            path: "/admins",
            name: "admins",
            component: Admins
        },
        {
            path: "/settings",
            name: "settings",
            component: Settings
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (handleFirstTime || !userStore.user) {
        await userStore.restoreToken();
        handleFirstTime = false;
    }
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
