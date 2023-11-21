import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import Lista from '@/components/listapacientes';

export default function ListaPacientes() {
  return (
    <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
      <Lista />
      <div className='flex'>
        <div class="tooltip">Ajuda
          <span class="tooltiptext">Aqui você vai ver a lista dos seus pacientes. Para editar ou criar uma dieta para um paciente, clique
            em "Editar dieta". Para editar ou criar um novo conjunto de medidas corporais para um paciente, clique em "Editar medidas"</span>
        </div>
      </div>
    </main>
  );
}
