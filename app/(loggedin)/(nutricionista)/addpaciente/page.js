'use client'
import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import ListaPacientes from '@/components/listaaddpacientes';
import AddPacientes from '@/components/addpacientes';
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function AddPaciente() {
    const help = () => {
        Swal.fire({
            title: "Adicionar Paciente",
            confirmButtonColor: "#32bb67",
            //text: "That thing is still around?",
            icon: "question",
            html: `<div class='align-left'>
            <p>Nesta página você pode gerar códigos de cadastro para novos pacientes. Você vai precisar do email do paciente
            para gerar o código. <br> Assim que digitar o email, clique em "Gerar código de cadastro", e o código aparecerá logo abaixo.
            Clique em "Copiar código" para copiar e enviá-lo ao paciente.<br> <b>OBS:</b> Só é possível gerar um código por email.</p>
            </div>`
        });
    }

    return (
        <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
            <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                <h2 className='h2-title'>Adicionar Paciente  <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
                <br></br>
                <div className='text-sm font-medium'>
                    <p>Digite o endereço de email do novo paciente para gerar seu código de cadastro.</p>
                </div>
            </div>
            {/* <ListaPacientes /> */}
            <AddPacientes />
        </main>
    );
}
