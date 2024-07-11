import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";
import { useRallyStore } from "./rally";
import { useProvaStore } from "./prova";

export const useStatsStore = defineStore("stats", () => {
    const rallyStore = useRallyStore();
    const provasStore = useProvaStore();
    provasStore.loadProvas({});
   

    const duracao_media_rally_total = computed(()=>{
        console.log(rallyStore.rallies[0], "compiuted")
        let soma = rallyStore.rallies.reduce((sum, n_obj)=>sum+((Date.parse(n_obj.data_fim) - Date.parse(n_obj.data_inicio))/ (1000 * 60 * 60 * 24)), 0)
        console.log("compiuted", soma)
        return (soma / rallyStore.rallies.length) + 1 //+1 pra contar o 1º dia 
    });

    const anosRallies = computed(()=>{
        const arr = new Set([]);
        console.log(rallyStore.rallies_sorted_date_asc, "sorted")
        rallyStore.rallies_sorted_date_asc.forEach(element => {
            arr.add(parseInt(element.data_inicio.split('-')[0]))
        });
        return [...arr];
    });

    const duracao_media_rally_anual = computed(()=>{
        const arr = [];
        var sum = 0;
        var n = 0;
        anosRallies.value.forEach(year => {
            const list = rallyStore.rallies_sorted_date_asc.filter((item) => parseInt(item.data_inicio.split('-')[0]) == year);
            let soma = list.reduce((sum, n_obj)=>sum+((Date.parse(n_obj.data_fim) - Date.parse(n_obj.data_inicio))/ (1000 * 60 * 60 * 24)), 0)
            arr.push((soma/list.length)+1)
        })
        return arr;
    })

    const provas_rally_total = computed(()=>{
        if (rallyStore.rallies == null || provasStore.provas_complete == null)
        {
            return 0;
        }
            
        return provasStore.provas_complete?.length / rallyStore.rallies?.length;
    })

    const provas_rally_anual = computed(()=>{
        const arr = [];
        anosRallies.value.forEach(year => {
            let sum = 0;
            const list = rallyStore.rallies_sorted_date_asc.filter((item) => parseInt(item.data_inicio.split('-')[0]) == year);
            list.forEach(rally => {
                const provas = provasStore.provas_complete.filter(item=>item.rally_id == rally.id)
                sum += provas.length;
            })
            arr.push(sum/list.length);
        })
        return arr;
    });

    return {duracao_media_rally_total, anosRallies, duracao_media_rally_anual, provas_rally_total, provas_rally_anual};
});
