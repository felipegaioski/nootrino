import Featured from '@/components/featured'
import { PiForkKnifeFill } from 'react-icons/pi'
import { BsChatFill, BsCart } from 'react-icons/bs'
import Link from 'next/link';

export default function Home() {
  return (
    <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
            <h2 className='h2-title'>Seus Pacientes</h2>
        </div>
        <div className='items-center justify-center flex-col w-full'>
            <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                <h3>Paciente 1</h3>
            </div>
            <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                <h3>Paciente 1</h3>
            </div>
            <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                <h3>Paciente 1</h3>
            </div>
            <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                <h3>Paciente 1</h3>
            </div>
            <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                <h3>Paciente 1</h3>
            </div>
            <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                <h3>Paciente 1</h3>
            </div>
        </div>
    </main>
  )
}
