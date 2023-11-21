'use client'
import { useState } from 'react';  // Import useState
import CriarAlimento from '@/components/criaralimentohome';

export default function NovoAlimento() {

    return (
        <main className='ml-[80px] pt-[60px] flex gap-[20px] px-[20px]'>
            <div className='flex items-center justify-start flex-col w-full flex-1'>
                <div className='items-center justify-start flex-col w-full flex-1 text-[20px] py-[20px] gap-[10px] font-bold'>
                    <h2 className='h2-title'>Criar Alimento</h2>
                </div>
                <CriarAlimento />
                <div className='flex pb-[200px]'>
                    <div class="tooltip">Ajuda
                        <span class="tooltiptext">Aqui você pode adicionar um novo alimento no banco de alimentos. Basta preencher com as informações
                            corretas e clicar em "Criar Alimento". Depois de criá-lo, ele irá aparecer na criação de dietas!
                            O formulário segue o padrão da Lista de Substituição de Alimentos. A Quantidade representa o valor da porção em gramas ou mililitros.
                            A Porção representa a quantidade relativa à medida caseira correspondente. A Unidade representa a medida caseira, ou seja, pode ser
                            fatias, unidades, colheres, etc. Calorias representa a quantidade de calorias referente à porção do alimento.</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
