'use client'
import AtualizarMedida from '@/components/medidasform'
import Medidasform from '@/components/medidasform'
import Swal from 'sweetalert2';
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";

export default function Medidas() {
  const help = () => {
    Swal.fire({
      title: "Medidas do Paciente",
      confirmButtonColor: "#32bb67",
      //text: "That thing is still around?",
      icon: "question",
      html: `<div class='align-left'>
      <p>Nesta página você pode visualizar os registros de medidas corporais do paciente.
      <br> <b>Novo Registro de Medidas: </b> clique nesse botão para preencher o formulário e adicionar um novo conjunto de medidas.
      <br> <b>Peso: </b>digite o peso do paciente em quilogramas (kg).
      <br> <b>Altura: </b>digite a altura do paciente em centímetros (sem ponto ou vírgula).
      <br> <b>IMC: </b>o imc será calculado automaticamente ao preencher o peso e a altura.
      <br> <b>Percentual de gordura: </b>digite o percentual de gordura do paciente.
      <br> <b>Circunferências: </b>digite as circunferências dos braços, das pernas e do abdômen do paciente.
      <br> <b>Selecione a data: </b>selecione a data do registro das medidas. Lembre-se que não é possível escolher uma data futura.
      <br> <b>Observações: </b>digite quaisquer observações sobre a avaliação do paciente.
      <br> <b>Salvar Medidas: </b>clique em "Salvar medidas" para finalizar e salvar o novo conjunto de medidas.
      <br> <b>Excluir: </b>clique no botão "Excluir" para excluir a medida da lista.
      <br> <b>Guia para o IMC: </b>por último, há uma tabela de guia rápido para o IMC.</p>
      </div>`
    });
  }

  return (
    <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
      <div className='flex items-center justify-start flex-col w-full flex-1'>
        <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
          <h2 className='h2-title'>Medidas do paciente <button onClick={help}><HiMiniQuestionMarkCircle color="green" size={30} /></button></h2>
        </div>
        <AtualizarMedida />
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

        </div>

      </div>
    </main>
  )
}
