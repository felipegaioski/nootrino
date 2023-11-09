
import React from 'react'
import { FaHouse, FaCalendar, FaGear } from 'react-icons/fa6'
import { BsChatFill } from 'react-icons/bs'
import { PiForkKnifeFill } from 'react-icons/pi'

export default function Sidebar() {
    return (
        <aside className='flex items-center justify-between flex-col fixed h-[calc(100vh-50px)] w-[60px] top-[50px] left-0 bg-white shadow-lg py-[30px]'>
            <div className='flex flex-col gap-[30px] items-center'>
                <a href="#"><FaHouse size={23} color="#babfc4" /></a>
                <a href="#"><BsChatFill size={23} color="#babfc4" /></a>
                <a href="#"><FaCalendar size={23} color="#babfc4" /></a>
                <a href="#"><PiForkKnifeFill size={23} color="#babfc4" /></a>
            </div>
            <div>
                <a href="#"><FaGear size={23} color="#babfc4" /></a>
            </div>
        </aside>
    )
}
