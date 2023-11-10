import React from 'react'
import { FaAppleAlt, FaUserAlt } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

export default function Header() {
    return (
        <nav className='green-gradient flex items-center justify-between px-[20px] h-[60px] bg-red-700 fixed top-0 left-0 w-screen z-[999]'>
            <a href="#">
                {/* <FaAppleAlt size={30} color="white" /> */}
                <img className="scale-60" src="Nootrino_logo_only.png"/>
            </a>
            <h1 className='text-[25px] text-white'>Nootrino</h1>
            <div className='flex items-center gap-[30px]'>
                <a href="#" className='flex items-center justify-center gap-[20px]'>
                    <span className='text-[14px] text-white'>Felipe Gaioski</span>
                    <FaUserAlt size={20} color="white" />
                </a>
                <a href="#" className='flex items-center justify-center gap-[20px]'>
                    <FiLogOut size={15} color="white" />
                    <span className='text-white text-[14px]'>Sair</span>
                </a>
            </div>
        </nav>
    )
}
