'use client'
import DietForm from '@/components/criardieta'
import MealPlanBuilder from '@/components/criardietaalimentos'
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function Home() {
  const help = () => {
    Swal.fire({
      title: "Criar Dieta",
      confirmButtonColor: "#32bb67",
      //text: "That thing is still around?",
      icon: "question",
      html: `<div class='align-left'>
      <p>Essa é a página de criação de dietas. 
      <br> Se o seu paciente já tiver uma dieta em vigor, você a verá abaixo. Basta clicar nos dias da semana. Caso seja um novo paciente, a dieta estará vazia.
      <br><br> <b>COMO CRIAR A DIETA:</b> 
      <br> <b>Selecione o dia da semana: </b>selecione na lista o dia da semana ao qual pretende adicionar um alimento. 
      <br> <b>Selecione a refeição: </b>selecione na lista a refeição à qual pretende adicionar um alimento.
      <br> <b>Selecione o alimento: </b>selecione o alimento que pretende adicionar à dieta. Quando selecionar um alimento, suas informações aparecerão abaixo!
      <br> <b>Quantidade: </b>digite a quantidade em gramas ou mililitros desejada do alimento. O sistema calculará
      automaticamente a porção e as calorias de acordo com a quantidade.
      <br> <b>Adicionar: </b>para adicionar o alimento à dieta do paciente, clique em "Adicionar". Você verá novo item ao clicar
      no dia da semana correspondente. 
      <br> <b>Excluir alimento: </b>para excluir um item da dieta, basta clicar no X ao lado direito do alimento. 
      <br> <b>Calorias: </b>você pode ver as calorias totais diárias da dieta conforme adiciona os alimentos. 
      <br> <b>Nome da dieta: </b>para dar um nome à dieta, é só preencher o campos "Nome da Dieta". Só é necessário preencher uma vez.
      <br> <b>Salvar Dieta: </b>para salvar, clique em "Salvar Dieta". 
      <br><br> <b>IMPORTANTE:</b> A DIETA SÓ SERÁ SALVA QUANDO CLICAR EM "Salvar Dieta". SE VOCÊ SAIR DESTA PÁGINA ANTES DE CLICAR, 
      SUAS ALTERAÇÕES NÃO SERÃO SALVAS.
      <br> <br> Clique em "Criar Novo alimento" para criar rapidamente um novo alimento, caso seja necessário.
      <a href="addalimento" className='text-[yellow]'> <b>Clique aqui</b> </a> para saber como.</p>
      </div>`
    });
  }

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Criar dieta <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
        </div>
        <MealPlanBuilder />
      </div>
    </main>
  )
}
