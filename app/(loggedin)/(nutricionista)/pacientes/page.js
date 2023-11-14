import { FaEdit } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';

export default function Home() {
  return (
    <main className='ml-[80px] pt-[60px] gap-[20px] px-[20px]'>
      <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
        <h2 className='h2-title'>Seus Pacientes</h2>
      </div>
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
    </main>
  );
}
