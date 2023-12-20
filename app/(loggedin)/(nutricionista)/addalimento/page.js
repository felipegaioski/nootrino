'use client'
import { useState } from 'react';  // Import useState
import CriarAlimento from '@/components/criaralimentohome';
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function NovoAlimento() {
    const help = () => {
        Swal.fire({
            title: "Criar Alimento",
            confirmButtonColor: "#32bb67",
            //text: "That thing is still around?",
            icon: "question",
            html: `<div class='align-left'>
            <p>Aqui você pode criar novos alimentos para adicioná-los às dietas dos seus pacientes. Basta preencher os campos e clicar em "Criar Alimento".
            <br> <b>Nome da comida:</b> Digite nesse campo o nome que desejar para o novo alimento. Lembre-se que não é possível adicionar um alimento cujo nome já exista!
            <br> <b>Quantidade:</b> Digite nesse campo a quantidade em gramas ou mililitros da porção do alimento. O valor deve ser maior que zero!
            <br> <b>Porção:</b> Digite nesse campo a medida caseira (valor numérico) correspondente à quantidade. O valor deve ser maior que zero!
            <br> <b>Unidade:</b> Selecione nesse campo o tipo da medida caseira.
            <br> <b>Calorias:</b> Digite nesse campo a quantidade de calorias dessa porção do alimento. O valor deve ser maior que zero!</p>
            </div>`
        });
    }

    return (
        <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
            <div className='flex items-center justify-start flex-col w-full flex-1'>
                <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                    <h2 className='h2-title'>Criar Alimento <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
                </div>
                <CriarAlimento />
            </div>
        </main>
    );
}
