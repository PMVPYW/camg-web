import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";

import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";

export const useHorarioStore = defineStore("horario", () => {
    const serverBaseUrl = inject("serverBaseUrl");
    const socket = inject("socket");
    const toast = useToast();
    const horarios = ref(null);
    const router = useRouter();

    const horariosScheduleFormat = computed(()=>{
        var result = []
        if (!horarios.value)
        {
            return [];
        }
        horarios.value.forEach((horario)=>{
            result.push({title: horario.titulo, description: horario.descricao, time: { start: horario.inicio.toString().slice(0, -3), end: horario.fim.toString().slice(0, -3) }, id: horario.id, color: 'yellow'});
        })
        console.log(horarios.value, "2as")
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



    function clearHorarios() {
        horarios.value = null;
    }


    return {
        loadHorarios,
        clearHorarios,
        horarios,
        horariosScheduleFormat
    };
});
