import React, { useState, useEffect } from 'react';
import {db} from '../firebase-config';
import { collection, addDoc, setDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import 'firebase/firestore';

function DayButtons({ dieta }) {
  const [day, setDay] = useState('');

  const dietaColletctionRef = collection(db, "dietas")

  const dieta_doc = doc(dietaColletctionRef, "dieta3")

  const createDieta = async () => {

  //console.log(dietaColletctionRef.nome)
    await setDoc(dieta_doc, dieta);

    };

  const handleButtonClick = (clickedDay) => {
    setDay(clickedDay);
  };

  const renderComidas = (refeicao) => {
    return (
      <td>
        {dieta.dias[day]?.refeicoes[refeicao]?.comidas.map((comida, index) => (
          <div key={index}>
            <p><b>{comida.nome}</b> - {comida.quantidade} gramas ou ml - {comida.porcao} {comida.unidade} - {comida.calorias} calorias</p>
            <br></br>
          </div>
        ))}
      </td>
    );
  };

  return (
    <div className="container mx-auto">
      <div>
        <h1>{dietaColletctionRef.nome}</h1>
      </div>
      <div className="grid grid-cols-7 gap-4">
        <button
          className={`square-button ${day === 'segunda_feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('segunda_feira')}>Segunda-feira</button>
        <button
          className={`square-button ${day === 'terca_feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('terca_feira')}>Terça-feira</button>
          <button
          className={`square-button ${day === 'quarta_feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('quarta_feira')}>Quarta-feira</button>
          <button
          className={`square-button ${day === 'quinta_feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('quinta_feira')}>Quinta-feira</button>
          <button
          className={`square-button ${day === 'sexta_feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('sexta_feira')}>Sexta-feira</button>
          <button
          className={`square-button ${day === 'sabado' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('sabado')}>Sábado</button>
          <button
          className={`square-button ${day === 'domingo' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('domingo')}>Domingo</button>
      </div>
      {day && (
        <div className='tabela-dieta'>
        <table className='mt-4'>
          <thead>
            <tr>
              <th>Refeição</th>
              <th>Lista de Comidas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Café da manhã</td>
              {renderComidas('cafe')}
            </tr>
            <tr>
              <td>Colação</td>
              {renderComidas('colacao')}
            </tr>
            <tr>
              <td>Almoço</td>
              {renderComidas('almoco')}
            </tr>
            <tr>
              <td>Lanche da Tarde</td>
              {renderComidas('lanche')}
            </tr>
            <tr>
              <td>Jantar</td>
              {renderComidas('jantar')}
            </tr>
            <tr>
              <td>Ceia</td>
              {renderComidas('ceia')}
            </tr>
            <tr>
              <td>Pré-treino</td>
              {renderComidas('pre_treino')}
            </tr>
            <tr>
              <td>Pós-treino</td>
              {renderComidas('pos_treino')}
            </tr>
          </tbody>
        </table>
      </div>
    )}
    <br></br>
    <div className='form-group'>
      <button onClick={createDieta}> Salvar Dieta </button>
    </div>
  </div>
  );
}

export default DayButtons;
