'use client'
import DietForm from '@/components/criardieta'
import MealPlanBuilder from '@/components/criardietaalimentos'

export default function Home() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Criar dieta</h2>
        </div>
        {/* <DietForm /> */}
        <MealPlanBuilder />
        <div className='flex pb-[300px]'>
          <div class="tooltip">Ajuda
            <span class="tooltiptext">Essa é a página de criação de dietas. No topo você pode criar rapidamente um novo alimento, caso seja necessário.
              <a href="addalimento" className='text-[yellow]'> Clique aqui </a> para saber como.
              Se o seu paciente já tiver uma dieta em vigor, você a verá abaixo, basta clicar nos dias da semana. Caso seja um novo paciente, a dieta estará vazia.
              COMO CRIAR A DIETA: Selecione o dia da semana, a refeição e o alimento. Digite a quantidade em gramas ou mililitros desejada do alimento. O sistema calculará
              automaticamente a porção e as calorias de acordo com a quantidade. Para adicioná-la à dieta do paciente, clique em "Adicionar". Você verá novo item ao clicar
              no dia da semana correspondente. Para excluir um item da dieta, basta clicar no X ao lado direito do alimento. Você pode ver as calorias totais da dieta conforme
              adiciona os alimentos. Para dar um nome à dieta, é só preencher o campos
              "Nome da Dieta". Para salvar, clique em "Salvar Dieta". IMPORTANTE: A DIETA SÓ SERÁ SALVA QUANDO CLICAR EM "Salvar Dieta".
              SE VOCÊ SAIR DESTA PÁGINA ANTES DE CLICAR, SUAS ALTERAÇÕES NÃO SERÃO SALVAS.
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
