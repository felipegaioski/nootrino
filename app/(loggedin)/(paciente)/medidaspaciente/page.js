'use client'
import ShowMedidasPaciente from '@/components/showmedidaspaciente'

export default function Home() {
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
            <tr>
              <td>Abaixo de 17</td>
              <td>Muito abaixo do peso</td>
            </tr>
            <tr>
              <td>Entre 17,1 e 18,5</td>
              <td>Abaixo do peso</td>
            </tr>
            <tr>
              <td>Entre 18,6 e 24,9</td>
              <td>Peso ideal</td>
            </tr>
            <tr>
              <td>Entre 25,0 e 29,9</td>
              <td>Levemente acima do peso</td>
            </tr>
            <tr>
              <td>Entre 30,0 e 34,9</td>
              <td>Obesidade grau I</td>
            </tr>
            <tr>
              <td>Entre 35,0 e 39,9</td>
              <td>Obesidade grau II (severa)</td>
            </tr>
            <tr>
              <td>Acima de 40</td>
              <td>Obesidade grau III (mórbida)</td>
            </tr>
          </tbody>
        </table>

      </div>
    </main>
  )
}
