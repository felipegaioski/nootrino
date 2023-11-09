
import React from 'react'
import { FaAppleAlt, FaUserAlt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

export default function Header() {
    return (
        <nav className='green-gradient flex items-center justify-between px-[20px] h-[50px] bg-red-700 fixed top-0 left-0 w-screen z-[999]'>
            <a href="#">
                <FaAppleAlt size={30} color="white" />
            </a>
            <div className='flex items-center gap-[30px]'>
                <a href="#" className='flex items-center justify-center gap-[20px]'>
                    <span className='text-[14px] text-white'>Felipe Gaioski</span>
                    <FaUserAlt size={20} color="blue" />
                </a>
                <a href="#" className='flex items-center justify-center gap-[20px]'>
                    <FiLogOut size={15} color="white" />
                    <span className='text-white text-[14px]'>Sair</span>
                </a>
            </div>
        </nav>
    )
}
