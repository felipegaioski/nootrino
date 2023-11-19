'use client'
import AtualizarMedida from '@/components/medidasform'
import Medidasform from '@/components/medidasform'

export default function Medidas() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Medidas do paciente</h2>
        </div>
        <AtualizarMedida />
      </div>
    </main>
  )
}
