import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import ListaPacientes from '@/components/listaaddpacientes';

export default function AddPaciente() {
    return (
        <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
            <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                <h2 className='h2-title'>Adicionar Paciente</h2>
                <br></br>
                <div className='text-sm font-medium'>
                    <p>Selecione o usuário para adicioná-lo aos seus pacientes</p>
                </div>
            </div>
            {/*
            <div className='items-center justify-center flex-col w-full'>
                <div className='flex items-center justify-start flex-col w-full flex-1 rounded-[5px] gap-[20px] shadow-sm p-3 mb-5 bg-white rounded max-w-[1200px] bg-gray'>
                    <div className="flex items-center justify-between w-full h2-title font-bold">
                        <h3>Paciente 1</h3>
                        <div className="flex gap-20 font-medium">
                            <a href='/dieta' className="flex items-center">
                                <BiSolidFoodMenu size={23} color="#00d46a" />
                                <span>Editar dieta</span>
                            </a>
                            <a href='/medidas' className="flex items-center">
                                <FaEdit size={23} color="#00d46a" />
                                <span>Editar medidas</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    */}
            <ListaPacientes />
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
