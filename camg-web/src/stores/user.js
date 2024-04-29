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
    const pagination_data = ref(null);

    const profile_photo = computed(() => user.value?.photo_url ? serverBaseUrl + '/storage/fotos/' + user.value?.photo_url : null)

    const toast = useToast();
    const router = useRouter();

    var first_time = true;


    //sockets
    socket.on("admin_registado", (admin) => {
        admins.value.push(admin);
        toast.warning("Um novo utilizador precisa de ser aprovado!")
    });

    socket.on("admin_atualizado", (admin) => {
        const index = admins.value.findIndex((item) => item.id == admin.id);
        if (index > -1) {
            admins.value[index] = admin;
        }
        if (admin.id == user.value.id) {
            user.value = admin;
            toast.warning("O seu utilizador foi editado!")
        } else {
            toast.success("Um utilizador foi editado!")
        }

    });

    socket.on("admin_autorizado", (admin) => {
        const index = admins.value.findIndex((item) => item.id == admin.id)
        if (index > -1) {
            admins.value[index] = admin;
        }
        toast.success("Um utilizador foi aprovado!")
    });

    socket.on("admin_eliminado", async (admin_id) => {
        admins.value = admins.value.filter((admin) => admin.id != admin_id);
        if (admin_id == user.value.id) {
            toast.error("O seu utilizador foi eliminado!")
            await logout();
            router.push({name: "login"})
        } else {
            toast.warning("Um utilizador foi eliminado!")
        }
    });

    socket.on("admin_bloqueado_desbloquado", async (admin) => {
        const index = admins.value.findIndex((item) => item.id == admin.id);
        if (index > -1) {
            admins.value[index] = admin;
        }
        if (admin.blocked) {
            if (admin.id == user.value.id) {
                toast.error("O seu utilizador foi bloqueado!")
                await logout();
                router.push({name: "login"})
            } else {
                toast.warning("Um utilizador foi bloqueado!")
            }
        } else {
            toast.success("Um utilizador foi desbloqueado!")
        }
    });

    //funcs

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

    async function loadAdmins(filters = null) {
        try {
            var sufix = '?';
            if (filters != null) {
                if (filters.page) {
                    sufix += 'page=' + filters.page + "&";
                }
                if (filters.status) {
                    sufix += "status=" + filters.status + "&"
                }
                if (filters.order) {
                    sufix += 'order=' + filters.order + "&"
                }
                if (filters.search) {
                    sufix += 'search=' + filters.search
                }
            }
            const response = await axios.get("admin" + sufix);
            admins.value = response.data.data;
            pagination_data.value = response.data.meta;
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
            if (admins.value[index].blocked) {
                toast.error("User Bloqueado!");
            } else {
                toast.success("User Desbloqueado!");
            }
            socket.emit("admin_bloqueado_desbloquado", admins.value[index]);
        } catch (error) {
            toast.warning(error.response.data.message);
        }
    }

    async function authorizeAdmin(id) {
        try {
            const response = await axios.patch(`admin/${id}/authorize`);
            const index = admins.value.findIndex((admin) => admin.id === id);
            if (index > -1) {
                admins.value[index] = response.data.data;
            }
            socket.emit("admin_autorizado", response.data.data);
            toast.success("User Autorizado!");
        } catch (error) {
            toast.warning(error.response.data.message);
        }
    }

    async function deleteAdmin(id) {
        try {
            const response = await axios.delete(`admin/${id}`);
            admins.value = admins.value.filter((admin) => admin.id !== id);
            socket.emit("admin_eliminado", id);
            if (user.value.id == id) {
                await logout();
                router.push({name: "login"})
            }
            toast.warning("Administrador Eliminado!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    function clearUser() {
        user.value = null;
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
            const response = await axios.post("auth/register", credentials, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            socket.emit("admin_registado", response.data.data);
            toast.success("Registado com sucesso. Precisa da Aprovação de um Administrador!");
            console.log(credentials, response.data.data)
            return response.data.data;
        } catch (error) {
            console.log(credentials);
            toast.warning(error.response.data.message);
            clearUser();
            return error;
        }
    }

    async function updateUser(user_arg) {
        try {
            user_arg['_method'] = 'PUT'
            if (typeof (user_arg.photo_url) == "string") {
                user_arg.photo_url = null;
            }
            const response = await axios.post(`admin/${user.value?.id}`, user_arg, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            socket.emit("admin_atualizado", response.data.data);
            toast.success("Atualizado com sucesso!");
            user.value = response.data.data;
            const index = admins.value.findIndex((item) => item.id == user.value.id);
            admins.value[index] = response.data.data;
            return true;
        } catch (error) {
            toast.warning(error.response.data.message);
            return error.response.data.errors;
        }
    }

    async function logout() {
        try {
            try {
                await axios.post("auth/logout");
            } catch (error) {

            }

            await sessionStorage.removeItem("token");
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
        profile_photo,
        admins,
        pagination_data,
        loadAdmins,
        loadUser,
        clearUser,
        login,
        register,
        updateUser,
        logout,
        blockAdmin,
        authorizeAdmin,
        deleteAdmin
    };
});
