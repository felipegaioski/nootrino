'use client'
import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import Lista from '@/components/listapacientes';
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function ListaPacientes() {
  const help = () => {
    Swal.fire({
      title: "Seus pacientes",
      confirmButtonColor: "#32bb67",
      //text: "That thing is still around?",
      icon: "question",
      html: `<div class='align-left'>
      <p>Nesta página você pode encontrar todos os seus pacientes. Para pesquisar, basta digitar o nome no campo "pesquisar paciente".
      <br> Clique em "Editar dieta" para criar ou editar a dieta de um paciente.
      <br> Clique em "Editar medidas" para ver e adicionar novas medidas corporais do paciente.</p>
      </div>`
    });
  }

  return (
    <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
      <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
        <h2 className='h2-title'>Seus Pacientes <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
      </div>
      <Lista />
      <br></br>
    </main>
  );
}
