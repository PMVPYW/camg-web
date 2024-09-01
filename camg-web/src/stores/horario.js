import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {useRallyStore} from "@/stores/rally.js";
import {useProvaStore} from "@/stores/prova.js";
import {useContactoStore} from "@/stores/contacto.js";

export const useHorarioStore = defineStore("horario", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();
    const horarios = ref(null);
    const router = useRouter();
    const rallyStore = useRallyStore();
    const provaStore = useProvaStore();

    socket.on("create_horario", (horario)=>{
        horarios.value.push(horario);
        toast.success("Foi adicionado um novo evento no Horário")
    })

    socket.on("update_horario", (horario)=>{
        const index = horarios.value.findIndex((item)=>item.id == horario.id);
        if (index > -1) {
            horarios.value[index] = horario;
        }
        toast.success("Foi atualizado um evento no Horário")
    })

    socket.on("delete_horario", (horario)=>{
        horarios.value = horarios.value.filter((item)=>item.id != horario.id);
        toast.success("Foi removido um evento do Horário")
    })

    const horariosScheduleFormat = computed(() => {
        var result = []
        if (!horarios.value) {
            return [];
        }
        horarios.value.filter((item) => rallyStore.rally_selected == item.rally_id).forEach((horario) => {
            result.push({
                title: horario.titulo + (horario.prova ? '-' + horario.prova.nome : ''),
                description: horario.descricao,
                start: horario.inicio.toString().slice(0, -3),
                end: horario.fim.toString().slice(0, -3),
                id: horario.id,
                calendarId: horario.tem_prova ? 'prova' : 'evento',
                isEditable: true
            });
        })
        console.log(horarios.value, result, "2ase")
        return result
    })

    async function loadHorarios() {
        try {
            const response = await axios.get(`horario`);
            horarios.value = response.data.data;
            console.log(response, "2assa")
        } catch (error) {
            clearHorarios();
            throw error;
        }
    }

    async function addHorario(data) {
        try {
            console.log("ADDDATA",data);
            data["rally_id"] = rallyStore.rally_selected;
            const response = await axios.post(`horario`, data);
            horarios.value.push(response.data.data);
            if(data.prova_id){
                const data2 = {
                    horario_id: response.data.data.id
                }
                const response_provas = await provaStore.editProva(data2, data.prova_id)
                const index = horarios.value.findIndex((item) => item.id == response.data.data.id);
                if (index < 0) {
                    toast.error("Erro ao atualizar horário");
                    return;
                }
                horarios.value[index].prova=response_provas;
                horarios.value[index].tem_prova=1;
            }
            toast.success("Horário Criado!")
            socket.emit("create_horario", response.data.data);
        } catch (error) {
            clearHorarios();
            loadHorarios();
            throw error;
        }
    }

    async function updateHorario(data) {
        try {
            console.log("DATA", data);
            data["rally_id"] = rallyStore.rally_selected;
            const response = await axios.put(`horario/${data.id}`, data);
            const index = horarios.value.findIndex((item) => item.id == data.id);
            if (index < 0) {
                toast.error("Erro ao atualizar horário");
                return;
            }
            const old_prova = horarios.value[index].tem_prova ? horarios.value[index].prova.id : null;
            horarios.value[index] = response.data.data;
            if(data.prova_id) {
                if (old_prova)
                {
                   await provaStore.editProva({"horario_id": null}, old_prova);
                }
                const data2 = {
                    horario_id: response.data.data.id
                }
                const response_provas = await provaStore.editProva(data2, data.prova_id);
                console.log("Prova associada a um contacto");
                if (index < 0) {
                    toast.error("Erro ao atualizar horário");
                    return;
                }
                horarios.value[index].prova=response_provas.data.data;
                horarios.value[index].tem_prova = 1;
            } else {
                horarios.value[index].tem_prova = 0;
            }
            if(data.prova_id === ""){
                const data2 = {
                    horario_id:null
                }
                provaStore.editProva(data2, response.data.data.prova.id)
                console.log("Prova não associada a um contacto");
                if (index < 0) {
                    toast.error("Erro ao atualizar horário");
                    return;
                }
                horarios.value[index].prova=null;
            }
            toast.warning("Horário Atualizado!")
            socket.emit("update_horario", response.data.data);
        } catch (error) {
            clearHorarios();
            loadHorarios();
            throw error;
        }
    }

    async function deleteHorario(id) {
        try {
            const response = await axios.delete("horario/" + id);
            horarios.value = horarios.value.filter((item) => item.id != id);
            toast.error("Horário Eliminado!")
            socket.emit("delete_horario", response.data.data);
        } catch (error) {
            clearHorarios();
            loadHorarios();
            throw error;
        }
    }


    function clearHorarios() {
        horarios.value = null;
    }


    return {
        loadHorarios, clearHorarios, addHorario, horarios, horariosScheduleFormat, updateHorario, deleteHorario
    };
});
