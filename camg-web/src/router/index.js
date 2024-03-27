import { createRouter, createWebHistory } from "vue-router";

//CAMG-WEB
import HomeView from "@/components/Dashboard/Dashboard.vue";
import Patrocinios from "@/components/Rallies/Patrocinios/Patrocinios.vue";
import Login from "@/views/Login.vue";

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
    ],
});


router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();

    if (to.name !== "login" && to.name !== "signup" && !userStore.user) {
        return next({ name: "login" });
    }

 /*   if (to.name === "cards" && !userStore.userIsAdmin) return next({ name: "home" });

    if (to.name === "sendMoney" && userStore.userIsAdmin) return next({ name: "home" });

    if (to.name === "transactions" && userStore.userIsAdmin) return next({ name: "home" });
*/
    next();
});

router.afterEach((to, from, failure) => {
    if (!failure) {
        setTimeout(() => {
            HSStaticMethods.autoInit();
        }, 100);
    }
});


export default router;
