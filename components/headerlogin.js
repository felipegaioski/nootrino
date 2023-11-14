import React from 'react'

export default function Headerlogin() {
    return (
        <nav className='bg-[#32bb67] flex items-center justify-between px-[20px] h-[60px] fixed top-0 left-0 w-screen z-[999]'>
            <a href="#">
                {/* <img className="scale-60" src="Nootrino_logo_only.png"/> */}
            </a>
            <div className="landing flex items-center justify-center gap-[20px]">
                <button><a href='/login'>Login</a></button>
            </div>
        </nav>
    )
}
