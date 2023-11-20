import React from 'react'
import { FaHouse, FaCalendar, FaGear } from 'react-icons/fa6'
import { BsPersonVcardFill } from 'react-icons/bs'
import { MdRestaurantMenu } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";

export default function SidebarPaciente() {
    return (
        <aside className='flex items-center justify-between flex-col fixed h-[calc(100vh-50px)] w-[60px] top-[50px] left-0 bg-white shadow-lg py-[30px]'>
            <div className='flex flex-col gap-[30px] items-center'>
                <a href="/homepaciente"><FaHouse size={23} color="#babfc4" /></a>
                <a href="/planoalimentar"><MdRestaurantMenu size={23} color="#babfc4" /></a>
                <a href="/consultas"><FaCalendar size={23} color="#babfc4" /></a>
                <a href="/medidaspaciente"><GiBodyHeight size={23} color="#babfc4" /></a>
            </div>
            <div>
                {/* <a href="#"><FaGear size={23} color="#babfc4" /></a> */}
            </div>
        </aside>
    )
}
