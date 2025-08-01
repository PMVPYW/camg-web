import {defineStore} from "pinia";
import {inject, ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import axios from "axios";

export const useNotificacaoStore = defineStore("notificacao", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");

    const router = useRouter();
    const toast = useToast();

    const users = ref(null)

    socket.on("notify_app_users", (obj, items) => {
        toast.success("Nova Noticia");
    });

    async function enviar_notificacao(data){
        try {
            console.log(data)
            console.log(data.titulo)
            console.log(data.conteudo)

            const obj= {
                "titulo": data.titulo,
                "descricao": data.conteudo ? data.conteudo : data.descricao,
            }
            const response = await axios.get("notificationToken");
            users.value = response.data.data;
            console.log("obj",obj);
            socket.emit('notify_app_users', obj , users.value);
        } catch (error) {
            throw error;
        }
    }


    return{
        enviar_notificacao
    };

});



