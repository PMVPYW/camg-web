import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

export const useUserStore = defineStore("user", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const user = ref(null);
    const admins = ref(null);

    const toast = useToast();
    const router = useRouter();

    var first_time = true;

    async function loadUser() {
        try {
            const response = await axios.get("user");
            user.value = response.data;
            console.log(user.value)
            if (first_time || !admins.value) {
                first_time = false;
                await loadAdmins();
            }
        } catch (error) {
            clearUser();
            throw error;
        }
    }

    async function loadAdmins() {
        try {
            const response = await axios.get("admin");
            admins.value = response.data.data;
            console.log(admins.value, "admins")
        } catch (error) {
            toast.error("Erro ao obter administradores!")
        }
    }

    async function blockAdmin(id) {
        try {
            const response = await axios.patch(`admin/${id}/toggle_blocked`);
            const index = admins.value.findIndex((admin) => admin.id === id);
            if (index > -1) {
                admins.value[index] = response.data.data;
            }
            if (admins.value[index].blocked)
            {
                toast.error("User Bloqueado!");
            } else {
                toast.success("User Desbloqueado!");
            }
        } catch (error) {
            toast.warning(error.response.data.message);
        }
    }

    async function deleteAdmin(id) {
        try {
            const response = await axios.delete(`admin/${id}`);
            admins.value = admins.value.filter((admin) => admin.id !== id);
            toast.warning("Administrador Eliminado!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function clearUser() {
        user.value = null;
    }

    async function signup(credentials) {
        try {
            const response = await axios.post("register", credentials);
            socket.emit("newVcard", response.data)
            return true;
        } catch (error) {
            clearUser();
            return error;
        }
    }

    async function login(credentials) {
        try {
            const response = await axios.post("auth/login", credentials);
            axios.defaults.headers.common.Authorization = "Bearer " + response.data.token;
            sessionStorage.setItem("token", response.data.token);
            await loadUser();
            return true;
        } catch (error) {
            console.log(credentials);
            toast.warning(error.response.data.message);
            clearUser();
            return error;
        }
    }

    async function register(credentials) {
        try {
            const response = await axios.post("auth/register", credentials);
            toast.success("Registado com sucesso. Precisa da Aprovação de um Administrador!");
            return response.data.data;
        } catch (error) {
            console.log(credentials);
            toast.warning(error.response.data.message);
            clearUser();
            return error;
        }
    }

    async function logout() {
        try {
            await axios.post("logout");
            sessionStorage.removeItem("token");
            delete axios.defaults.headers.common.Authorization;
            clearUser();

            return true;
        } catch (error) {
            return false;
        }
    }

    async function restoreToken() {
        let storedToken = sessionStorage.getItem("token");

        if (storedToken) {
            axios.defaults.headers.common.Authorization = "Bearer " + storedToken
            await loadUser();
            return true
        }

        clearUser();
        return false;
    }


    return {
        restoreToken,
        user,
        admins,
        loadAdmins,
        loadUser,
        clearUser,
        login,
        register,
        logout,
        signup,
        blockAdmin,
        deleteAdmin
    };
});
