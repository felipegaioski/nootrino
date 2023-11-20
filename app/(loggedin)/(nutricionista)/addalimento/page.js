'use client'
import { useState } from 'react';  // Import useState
import CriarAlimento from '@/components/criaralimentohome';

export default function NovoAlimento() {

    return (
        <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
            <div className='flex items-center justify-start flex-col w-full flex-1'>
                <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                    <h2 className='h2-title'>Criar Alimento</h2>
                </div>
                <CriarAlimento />
                <div className='items-center justify-center flex-col w-full'>
                </div>
            </div>
        </main>
    );
}
