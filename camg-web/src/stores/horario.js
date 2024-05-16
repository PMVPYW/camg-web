import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {useRallyStore} from "@/stores/rally.js";

export const useHorarioStore = defineStore("horario", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();
    const horarios = ref(null);
    const router = useRouter();
    const rallyStore = useRallyStore();


    const horariosScheduleFormat = computed(() => {
        var result = []
        if (!horarios.value) {
            return [];
        }
        horarios.value.filter((item) => rallyStore.rally_selected == item.rally_id).forEach((horario) => {
            result.push({
                title: horario.titulo,
                description: horario.descricao,
                start: horario.inicio.toString().slice(0, -3),
                end: horario.fim.toString().slice(0, -3),
                id: horario.id,
                color: 'yellow',
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
            data["rally_id"] = rallyStore.rally_selected;
            const response = await axios.post(`horario`, data);
            horarios.value.push(response.data.data);
            console.log(horarios.value, "2assa", response.data.data);
        } catch (error) {
            clearHorarios();
            loadHorarios();
            throw error;
        }
    }

    async function updateHorario(data) {
        try {
            data["rally_id"] = rallyStore.rally_selected;
            const response = await axios.put(`horario/${data.id}`, data);
            const index = horarios.value.findIndex((item) => item.id == data.id);
            if (index < 0) {
                toast.error("Erro ao atualizar horário");
                return;
            }
            horarios.value[index] = response.data.data;
            console.log(horarios.value, "2assa", response.data.data);
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
        loadHorarios, clearHorarios, addHorario, horarios, horariosScheduleFormat, updateHorario
    };
});
