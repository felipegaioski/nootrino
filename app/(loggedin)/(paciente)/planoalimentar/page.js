import { FaCalendar } from 'react-icons/fa6'
import { MdRestaurantMenu } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import ShowDieta from '@/components/showdietapaciente';

export default function PlanoAlimentar() {
    return (
        <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
            <div className='flex items-center justify-start flex-col w-full flex-1'>
                <br></br>
                <ShowDieta />
                <div class="tooltip">Ajuda
                    <span class="tooltiptext">Aqui é onde você pode ver a sua dieta semanal! Clique nos dias da semana para ver as suas refeições. Se você recebeu um alerta,
                        é porque o seu / sua nutricionista ainda não criou uma dieta para você.</span>
                </div>
            </div>
        </main>
    )
}
