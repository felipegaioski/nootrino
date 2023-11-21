'use client'
import ShowMedidasPaciente from '@/components/showmedidaspaciente'

export default function MedidasPaciente() {
  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Suas Medidas Corporais</h2>
        </div>
        <ShowMedidasPaciente />
      </div>
      <div className='form-group items-center'>
        <h1><b>Guia para o IMC</b></h1>
        <table className='table-fixed'>
          <thead>
            <tr>
              <th>IMC</th>
              <th>Classificação</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-[#c90808]'>
              <td>Abaixo de 17</td>
              <td>Muito abaixo do peso</td>
            </tr>
            <tr className='text-[#ebbf13]'>
              <td>Entre 17,1 e 18,5</td>
              <td>Abaixo do peso</td>
            </tr>
            <tr className='text-[#1eb80d]'>
              <td>Entre 18,6 e 24,9</td>
              <td>Peso ideal</td>
            </tr>
            <tr className='text-[#ebbf13]'>
              <td>Entre 25,0 e 29,9</td>
              <td>Levemente acima do peso</td>
            </tr>
            <tr className='text-[#c90808]'>
              <td>Entre 30,0 e 34,9</td>
              <td>Obesidade grau I</td>
            </tr>
            <tr className='text-[#9c0606]'>
              <td>Entre 35,0 e 39,9</td>
              <td>Obesidade grau II (severa)</td>
            </tr>
            <tr className='text-[#730505]'>
              <td>Acima de 40</td>
              <td>Obesidade grau III (mórbida)</td>
            </tr>
          </tbody>
        </table>
        <div class="tooltip">Ajuda
          <span class="tooltiptext">Aqui você pode visualizar o seu histórico de medidas corporais, assim você pode acompanhar a sua evolução!</span>
        </div>
      </div>
    </main>
  )
}
