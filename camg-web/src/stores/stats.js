import axios from "axios";
import {ref, computed, inject} from "vue";
import {defineStore} from "pinia";
import { useRallyStore } from "./rally";
import { useProvaStore } from "./prova";
import { usePatrocinioStore } from "./patrocinio";
import { useHorarioStore } from "./horario";

export const useStatsStore = defineStore("stats", () => {
    const socket = inject("socket");
    const rallyStore = useRallyStore();
    const provasStore = useProvaStore();
    const patrocinioStore = usePatrocinioStore();
    const horarioStore = useHorarioStore();
    const clients_in_app = ref(0);
    const clients_in_app_history = ref([]);
    const tempos_rallies = ref(null);
    provasStore.loadProvas({});
    patrocinioStore.loadPatrocinios({});
    horarioStore.loadHorarios();
const recompute = ref(false);
//participants data and update
socket.emit("stats");
const participants = ref({});
socket.on("participants", (parts)=>{
    participants.value = parts.value;
    console.log(parts.value, "parts");
})

socket.on("classifications", (classi)=>{
    tempos_rallies.value = classi.value;
    console.log(classi.value, "class");
})


socket.on("clients", (clients) => {
    clients_in_app.value = clients;
    clients_in_app_history.value.push(clients)
});
socket.emit("participants");
socket.emit("classifications");
//stats
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

    const média_participants_rally = computed(()=>{
        const keys = Object.keys(participants.value);
        var sum = 0;
        keys.forEach(e => {
            sum+=participants.value[e].value.data.length;
        })
        return sum / keys.length;
    });

    const nome_rallies_ordenados_data = computed(()=>{
        const arr = [];
        rallyStore.rallies_sorted_date_asc.forEach(e => {
            arr.push(e.external_entity_id)
        })
        return arr;
    });

    const nome_rallies_ordenados_distancia_asc = computed(()=>{
        const names = [];
        let arr = [...rallyStore.rallies];
        arr.sort((a, b) => {
            var sum1 = 0;
            var sum2 = 0;
            provasStore.provas_complete.filter((item)=>item.rally_id == a.id).forEach((prova)=>{
                sum1 += prova.distancia_percurso;           
        })
        provasStore.provas_complete.filter((item)=>item.rally_id == b.id).forEach((prova)=>{
            sum2 += prova.distancia_percurso;
        })
            return sum1 - sum2;
        });
        arr.forEach((item)=>{
            names.push(item.external_entity_id);
        })
        return names;
        })

    const nome_rallies_ordenados_distancia_desc = computed(()=>{
        const names = [];
        let arr = [...rallyStore.rallies];
        arr.sort((a, b) => {
            var sum1 = 0;
            var sum2 = 0;
            provasStore.provas_complete.filter((item)=>item.rally_id == a.id).forEach((prova)=>{
                sum1 += prova.distancia_percurso;           
        })
        provasStore.provas_complete.filter((item)=>item.rally_id == b.id).forEach((prova)=>{
            sum2 += prova.distancia_percurso;
        })
        return sum2 - sum1;
        });
        arr.forEach((item)=>{
            names.push(item.external_entity_id);
        })
        return names;
    })

    const nome_rallies = computed(()=>{
        const arr = [];
        rallyStore.rallies.forEach(e => {
            arr.push(e.external_entity_id)
        })
        return arr;
    });


    const participantes_por_rally = computed(()=>{
        const arr = [];
        rallyStore.rallies_sorted_date_asc.forEach(e => {
            arr.push(participants.value[e.external_entity_id] ? participants.value[e.external_entity_id].value.data.length : 0)
        })
        return arr;
    });

    const top_nacionalidades_rally = computed(()=>{
        const keys = Object.keys(participants.value);
        const freqMap = {};
        const sortedObj = {};
        keys.forEach(e => {
            participants.value[e].value.data.forEach(participant => {
                if (freqMap[participant.pilot_nat] != undefined)
                {
                    freqMap[participant.pilot_nat] = freqMap[participant.pilot_nat] + 1;
                } else {
                    freqMap[participant.pilot_nat] = 1;
                }
                if (freqMap[participant.copilot_nat] != undefined)
                {
                    freqMap[participant.copilot_nat] = freqMap[participant.copilot_nat] + 1;
                } else {
                    freqMap[participant.copilot_nat] = 1;
                }
            });
            const entries = Object.entries(freqMap);
            entries.sort((a, b) => freqMap[a] - freqMap[b]);
            entries.forEach(entry => {
                sortedObj[entry[0]] = entry[1];
            });
        })
        return sortedObj;
    });

    const distancia_minima_rally_total = computed(()=>{
        var min = null;
        rallyStore.rallies.forEach((element) => {
            var sum = 0;
            provasStore.provas_complete.filter((item)=>item.rally_id == element.id).forEach((prova)=>{
                sum += prova.distancia_percurso;
            })
            if (sum < min || min == null)
            {
                min = sum;
            }
        })
        return min / 1000;
    });

    const distancia_rallies = computed(()=>{
        var dict = [];
        rallyStore.rallies.forEach((element) => {
            var sum = 0;
            provasStore.provas_complete.filter((item)=>item.rally_id == element.id).forEach((prova)=>{
                sum += prova.distancia_percurso;
            })
           dict.push(sum/1000)
        })
        return dict;
    });

    const distancia_rallies_sort_asc = computed(()=>{
        var a = [...distancia_rallies.value];
        a.sort((a, b) => a - b)
        return a;
    });

    const distancia_rallies_sort_desc = computed(()=>{
        var a = [...distancia_rallies.value];
        a.sort((a, b) => b - a)
        return a;
    });

    const distancia_media_rally_total = computed(()=>{
        var dists = 0;
        rallyStore.rallies.forEach((element) => {
            var sum = 0;
            provasStore.provas_complete.filter((item)=>item.rally_id == element.id).forEach((prova)=>{
                sum += prova.distancia_percurso;
            })
            dists+=sum;
        })
        return dists /rallyStore.rallies.length / 1000;
    });

    const distancia_maxima_rally_total = computed(()=>{
        var max = 0;
        rallyStore.rallies.forEach((element) => {
            var sum = 0;
            provasStore.provas_complete.filter((item)=>item.rally_id == element.id).forEach((prova)=>{
                sum += prova.distancia_percurso;
            })
            if (sum > max)
            {
                max = sum;
            }
        })
        return max / 1000;
    });

    const topPatrocinios = computed(()=>{
        const mapObj = {}
        patrocinioStore.patrocinios_complete.forEach((patrocinio) => {
            if (mapObj[patrocinio.entidade_id.nome] == undefined)
            {
                mapObj[patrocinio.entidade_id.nome] = 1;
            } else {
                mapObj[patrocinio.entidade_id.nome]++;
            }
        })
        console.log("mapobj", mapObj)
        return mapObj;
    })


    const ultimo_evento = computed(()=>{
        const list = horarioStore.horarios.filter((item) => new Date(item.inicio) < Date.now()).sort((a, b) => new Date(b.fim) - new Date(a.fim))
        return list[0] ?? null; //por ao contrario
    })

    const proximo_evento = computed(()=>{
        const list = horarioStore.horarios.filter((item) => new Date(item.inicio) > Date.now()).sort((a, b) => new Date(a.inicio) - new Date(b.inicio))
        return list[0] ?? null;
    })

    const renew_events = ()=>{
        recompute.value = !recompute.value;
    }

    const melhor_tempo_rally = computed(()=>{
        if(tempos_rallies.value == null)
        {
            return;
        }
        const result = [];
        const rallies = Object.keys(tempos_rallies.value);
        rallies.forEach((r)=>{
            const provas = Object.keys(tempos_rallies.value[r].value);
            var best_time = Infinity;
            tempos_rallies.value[r].value[provas[provas.length-1]].accumulated.forEach((time)=>{
                if (time.time < best_time)
                {
                    best_time = time.time;
                }
            })
            result.push(best_time)
        })
        return result;
    })

    const pior_tempo_rally = computed(()=>{
        if(tempos_rallies.value == null)
        {
            return;
        }
        const result = [];
        const rallies = Object.keys(tempos_rallies.value);
        rallies.forEach((r)=>{
            const provas = Object.keys(tempos_rallies.value[r].value);
            var worst_time = -Infinity;
            tempos_rallies.value[r].value[provas[provas.length-1]].accumulated.forEach((time)=>{
                if (time.time > worst_time)
                {
                    worst_time = time.time;
                }
            })
            result.push(worst_time)
        })
        return result;
    })
    return {pior_tempo_rally, melhor_tempo_rally, ultimo_evento, proximo_evento, renew_events, topPatrocinios, clients_in_app, clients_in_app_history, duracao_media_rally_total, anosRallies, duracao_media_rally_anual, provas_rally_total, provas_rally_anual, média_participants_rally, nome_rallies_ordenados_data, nome_rallies_ordenados_distancia_asc, nome_rallies_ordenados_distancia_desc, nome_rallies, participantes_por_rally, top_nacionalidades_rally, distancia_minima_rally_total, distancia_media_rally_total, distancia_maxima_rally_total, distancia_rallies, distancia_rallies_sort_asc, distancia_rallies_sort_desc};
});