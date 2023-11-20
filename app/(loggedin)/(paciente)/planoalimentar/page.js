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
            </div>
        </main>
    )
}
