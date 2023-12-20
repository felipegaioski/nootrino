'use client'
import { FaCalendar } from 'react-icons/fa6'
import { MdRestaurantMenu } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import ShowDieta from '@/components/showdietapaciente';
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function PlanoAlimentar() {
    const help = () => {
        Swal.fire({
            title: "Sua dieta",
            confirmButtonColor: "#32bb67",
            //text: "That thing is still around?",
            icon: "question",
            html: `<div class='align-left'>
            <p>Aqui você pode ver a sua dieta da semana. Basta clicar no dia da semana para ver a lista de alimentos!</p>
            </div>`
        });
    }

    return (
        <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
            <div className='flex items-center justify-start flex-col w-full flex-1'>
                <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                    <h2 className='h2-title'>Sua dieta <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
                </div>
                <ShowDieta />
            </div>
        </main>
    )
}
