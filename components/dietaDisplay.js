import React from 'react';

const DietaDisplay = ({ dieta, updateKey }) => {
  return (
    <div>
      <h2>Plano Alimentar</h2>
      {Object.keys(dieta.dias).map((dia) => (
        <div key={dia}>
          <h3>{dia}</h3>
          {Object.keys(dieta.dias[dia].refeicoes).map((refeicao) => (
            <div key={refeicao}>
              <h4>{refeicao}</h4>
              <ul>
                {dieta.dias[dia].refeicoes[refeicao].comidas.map((comida, index) => (
                  <li key={index}>
                    {comida.nome} - {comida.quantidade} {comida.unidade} - {comida.calorias} calorias
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DietaDisplay;
