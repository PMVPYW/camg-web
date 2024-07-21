<script setup>
import { ref } from "vue";
import { useStatsStore } from "@/stores/stats";
import Card from "./Card.vue"
import ToogleSwitch from "./toogleSwitchStatistic.vue"
import ToogleSwitchEvent from "./toogleSwitchEvent.vue"
import TopNationalites from "./TopNationalities.vue"
import TopPatrocinos from "./TopPatrocinios.vue"
import TimeChart from "./TimeChart.vue"
const statsStore = useStatsStore();
const prox = ref(statsStore.proximo_evento);
const prev = ref(statsStore.ultimo_evento);

function renew(){
  statsStore.renew_events();
  prox.value = statsStore.proximo_evento;
  prev.value = statsStore.ultimo_evento;
}

console.log("compiuted", statsStore.melhor_tempo_rally)
  </script>

  <template>
    <div class="rounded-xl h-full transition-all duration-200 block w-full" id="panel">
      <h1 class="text-2xl font-bold ml-10 mt-10">Dashboard</h1>
      <div class="w-11/12 h-full flex place-content-around flex-wrap">
        <Card titulo="Duração Média de um Rally">
          <ToogleSwitch opcao1="Total" opcao2="Anual" :stat1="statsStore.duracao_media_rally_total" :chart-categories="statsStore.anosRallies" :series="statsStore.duracao_media_rally_anual" unidade_medida="Dias"/>
        </Card>  

        <Card titulo="Média de provas por rally">
          <ToogleSwitch opcao1="Total" opcao2="Anual" :stat1="statsStore.provas_rally_total" :chart-categories="statsStore.anosRallies" :series="statsStore.provas_rally_anual" unidade_medida="Provas"/>
        </Card> 
        
        <Card titulo="Quantidade de participantes por rally">
          <ToogleSwitch opcao1="Média" opcao2="Rally" :stat1="statsStore.média_participants_rally" :chart-categories="statsStore.nome_rallies_ordenados_data" :series="statsStore.participantes_por_rally" unidade_medida="Participantes"/>
        </Card> 

        <Card titulo="Utilizadores na Aplicação">
          <ToogleSwitch opcao1="Tempo Real" opcao2="Histórico" :stat1="statsStore.clients_in_app" :chart-categories="null" :series="statsStore.clients_in_app_history" unidade_medida="Clientes"/>
        </Card>

        <TopNationalites/>
        <TopPatrocinos/>
       
        <Card titulo="Distância minima de rally">
          <ToogleSwitch opcao1="Total" opcao2="Rally" :stat1="statsStore.distancia_minima_rally_total" :chart-categories="statsStore.nome_rallies_ordenados_distancia_asc" :series="statsStore.distancia_rallies_sort_asc" unidade_medida="Km"/>
        </Card> 
        <Card titulo="Distância média de rally">
          <ToogleSwitch opcao1="Total" opcao2="Rally" :stat1="statsStore.distancia_media_rally_total" :chart-categories="statsStore.nome_rallies" :series="statsStore.distancia_rallies" unidade_medida="Km"/>
        </Card> 
        <Card titulo="Distância máxima de rally">
          <ToogleSwitch opcao1="Total" opcao2="Rally" :stat1="statsStore.distancia_maxima_rally_total" :chart-categories="statsStore.nome_rallies_ordenados_distancia_desc" :series="statsStore.distancia_rallies_sort_desc" unidade_medida="Km"/>
        </Card> 

        <Card titulo="Eventos">
          <ToogleSwitchEvent @renew="renew" opcao1="Próximo" opcao2="Ultimo" :ev1="prox" :ev2="prev"/>
        </Card> 

        <TimeChart/>
          
      </div>
    </div>
  </template>
