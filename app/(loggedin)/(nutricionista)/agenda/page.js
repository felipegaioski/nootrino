'use client'
import { useState } from 'react';  // Import useState
import Agendamento from '@/components/agendamento'
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function Agenda() {
  const help = () => {
    Swal.fire({
      title: "Agendamentos",
      confirmButtonColor: "#32bb67",
      //text: "That thing is still around?",
      icon: "question",
      html: `<div class='align-left'>
      <p>Aqui é onde você pode ver, criar e excluir seus agendamentos.
      <br> <b>Filtros: </b>para filtrar os agendamentos, basta digitar o nome do paciente e/ou selecionar uma data. Marque ao lado se deseja ver todos os agendamentos, apenas 
      os concluídos ou apenas os futuros.
      <br> <b>Ordenar: </b>é possível ordenar os agendamentos por paciente, por data e por local. Basta clicar no nome da coluna correspondente.
      Além disso, você pode alterar entre ordem crescente ou ordem decrescente clicando na seta ao lado do nome da coluna.
      <br> <b>Novo Agendamento: </b>clique no botão "Novo Agendamento" para preencher o formulário.
      <br> <b>Preenchimento do novo agendamento:</b>
      <br> <b>Selecione o paciente: </b>selecione o paciente na lista ou digite o nome para pesquisá-lo.
      <br> <b>Selecione a data: </b>escolha a data do agendamento. Lembre que só é possível registrar agendamentos para datas futuras!
      <br> <b>Selecione a hora: </b>escolha o horário do agendamento. Lembre-se que só aparecerão na lista os horários disponíveis para a data selecionada!
      <br> <b>Local: </b>Digite o local escolhido para a consulta.
      <br> <b>Agendar consulta: </b>clique em "Agendar consulta" para salvar o novo agendamento.</p>
      </div>`
    });
  }

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Agendamentos <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
        </div>
        <Agendamento />
        <br></br>
        <br></br>
      </div>
    </main>
  );
}
