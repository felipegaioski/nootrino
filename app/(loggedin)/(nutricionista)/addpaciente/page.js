import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import ListaPacientes from '@/components/listaaddpacientes';
import AddPacientes from '@/components/addpacientes';

export default function AddPaciente() {
    return (
        <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
            <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                <h2 className='h2-title'>Adicionar Paciente</h2>
                <br></br>
                <div className='text-sm font-medium'>
                    <p>Digite o endereço de email do novo paciente para gerar seu código de cadastro.</p>
                </div>
            </div>
            {/* <ListaPacientes /> */}
            <AddPacientes />
            <div className='flex pb-[200px]'>
                <div class="tooltip">Ajuda
                    <span class="tooltiptext">Aqui você pode adicionar um novo paciente! Basta pesquisar, selecioná-lo e clicar em "Adicionar".
                        (você pode escrever o nome do paciente para encontrá-lo mais rápido). Se você não encontrar o paciente que deseja, certifique-se
                        de que ele realizou o cadastro na Nootrino!</span>
                </div>
            </div>
        </main>
    );
}
