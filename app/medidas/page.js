'use client'
import Featured from '@/components/featured'
import Testform from '@/components/testform'
import { PiForkKnifeFill } from 'react-icons/pi'
import { BsChatFill, BsCart } from 'react-icons/bs'
import Link from 'next/link';

export default function Home() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      {/* <Featured /> */}
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <Testform />
      </div>
    </main>
  )
}
