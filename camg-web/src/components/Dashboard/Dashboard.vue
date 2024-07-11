 <script setup>
 import { useStatsStore } from "@/stores/stats";
import Card from "./Card.vue"
 import ToogleSwitch from "./toogleSwitchStatistic.vue"

 const statsStore = useStatsStore();
 console.log(statsStore.provas_rally_total, "compiuted assa")
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
      </div>
    </div>
  </template>
