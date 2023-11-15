'use client'
import DietForm from '@/components/criardieta'
import MealPlanBuilder from '@/components/criardietaalimentos'

export default function Home() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Criar dieta</h2>
        </div>
        {/* <DietForm /> */}
        <MealPlanBuilder />
      </div>
    </main>
  )
}
