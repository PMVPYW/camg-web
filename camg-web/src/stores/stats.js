import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";
import { useRallyStore } from "./rally";

export const useStatsStore = defineStore("stats", () => {
    const rallyStore = useRallyStore();


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

    return {duracao_media_rally_total, anosRallies, duracao_media_rally_anual};
});
