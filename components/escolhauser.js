import React from 'react'

export default function Escolhauser() {
    return (
        <div>
            <div className='flex justify-center'>
                <h2 className="text-[#FFFF] text-base items-center">Cadastrar-se como</h2>
            </div>
            <div className="escolha flex">
                <div className='px-[50px]'>
                    <button><a href='/cadastronutri'>Nutricionista</a></button>
                </div>
                <div className='px-[50px]'>
                    <button><a href='/cadastropaciente'>Paciente</a></button>
                </div>
            </div>
        </div>
    )
}