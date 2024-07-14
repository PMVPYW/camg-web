 <script setup>
 import { useStatsStore } from "@/stores/stats";
import Card from "./Card.vue"
import ToogleSwitch from "./toogleSwitchStatistic.vue"
import TopNationalites from "./TopNationalities.vue"
const statsStore = useStatsStore();
 console.log(statsStore.distancia_rallies_sort_desc, "compiuted assa")
  </script>

  <template>
    <div class="rounded-xl transition-all duration-200 block w-full" id="panel">
      <h1 class="text-2xl font-bold ml-10 mt-10">Dashboard</h1>
      <div class="w-11/12 flex place-content-around flex-wrap">
        <Card titulo="Duração Média de um Rally">
          <ToogleSwitch opcao1="Total" opcao2="Anual" :stat1="statsStore.duracao_media_rally_total" :chart-categories="statsStore.anosRallies" :series="statsStore.duracao_media_rally_anual" unidade_medida="Dias"/>
        </Card>  

        <Card titulo="Média de provas por rally">
          <ToogleSwitch opcao1="Total" opcao2="Anual" :stat1="statsStore.provas_rally_total" :chart-categories="statsStore.anosRallies" :series="statsStore.provas_rally_anual" unidade_medida="Provas"/>
        </Card> 
        
        <Card titulo="Quantidade de participantes por rally">
          <ToogleSwitch opcao1="Média" opcao2="Rally" :stat1="statsStore.média_participants_rally" :chart-categories="statsStore.nome_rallies_ordenados_data" :series="statsStore.participantes_por_rally" unidade_medida="Participantes"/>
        </Card> 
        <TopNationalites/>
          
        <Card titulo="Utilixadores na Aplicação">
          <ToogleSwitch opcao1="Tempo Real" opcao2="Histórico" :stat1="statsStore.clients_in_app" :chart-categories="null" :series="statsStore.clients_in_app_history" unidade_medida="Clientes"/>
        </Card>
       
        <Card titulo="Distância minima de rally">
          <ToogleSwitch opcao1="Total" opcao2="Rally" :stat1="statsStore.distancia_minima_rally_total" :chart-categories="statsStore.nome_rallies_ordenados_distancia_asc" :series="statsStore.distancia_rallies_sort_asc" unidade_medida="Km"/>
        </Card> 
        <Card titulo="Distância média de rally">
          <ToogleSwitch opcao1="Total" opcao2="Rally" :stat1="statsStore.distancia_media_rally_total" :chart-categories="statsStore.nome_rallies" :series="statsStore.distancia_rallies" unidade_medida="Km"/>
        </Card> 
        <Card titulo="Distância máxima de rally">
          <ToogleSwitch opcao1="Total" opcao2="Rally" :stat1="statsStore.distancia_maxima_rally_total" :chart-categories="statsStore.nome_rallies_ordenados_distancia_desc" :series="statsStore.distancia_rallies_sort_desc" unidade_medida="Km"/>
        </Card> 
          
      </div>
    </div>
  </template>
