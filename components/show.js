import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, setDoc, updateDoc, doc, addDoc, getDocs } from 'firebase/firestore';
import { TiDelete } from "react-icons/ti";
import 'firebase/firestore';

function DayButtons({ dieta, setDieta, doc_id }) {
  const [day, setDay] = useState('');

  const dietaColletctionRef = collection(db, "dietas")
  // let doc_id;
  // if (typeof window !== 'undefined') {
  //   doc_id = localStorage.getItem('doc_id');
  // }

  let codPaciente;
  // Pegar código a partir da url
  //useEffect(() => {
  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { id } = params;
    codPaciente = id;
  }
  //}, []);

  const salvarDieta = async () => {

    const data = await getDocs(collection(db, "dietas"));
    const dietas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    let foundDieta = null;

    dietas.forEach((d) => {
      if (d.cod_paciente === codPaciente) {
        foundDieta = d;
      }
    });

    if (foundDieta) {
      const dieta_doc = doc(db, "dietas", foundDieta.id);
      await updateDoc(dieta_doc, dieta);
      //localStorage.removeItem('doc_id');
      foundDieta = null;
    } else {
      await addDoc(dietaColletctionRef, dieta);
    }
    alert("Dieta salva com sucesso!");
  };

  const handleButtonClick = (clickedDay) => {
    setDay(clickedDay);
  };

  const handleDeleteItem = (refeicao, comidaIndex) => {
    const updatedDieta = { ...dieta };
    const comidas = updatedDieta.dias[day]?.refeicoes[refeicao]?.comidas;

    if (comidas && comidas.length > comidaIndex) {
      comidas.splice(comidaIndex, 1);
      setDieta(updatedDieta);
    }
  };

  const calculateTotalCalories = () => {
    const totalCaloriesPerDay = {};

    Object.keys(dieta.dias).forEach((dia) => {
      let totalCalories = 0;

      Object.keys(dieta.dias[dia].refeicoes).forEach((refeicao) => {
        const comidas = dieta.dias[dia].refeicoes[refeicao].comidas;

        comidas.forEach((comida) => {
          totalCalories += parseFloat(comida.calorias);
        });
      });

      totalCaloriesPerDay[dia] = totalCalories.toFixed(1);
    });

    return totalCaloriesPerDay;
  };

  const renderComidas = (refeicao) => {
    return (
      <td>
        {dieta.dias[day]?.refeicoes[refeicao]?.comidas.map((comida, index) => (
          <div key={index}>
            <p><b>{comida.nome}</b> - {comida.quantidade} gramas ou ml - {comida.porcao} {comida.unidade} - {comida.calorias} calorias
              <button className='text-green font-semibold' onClick={() => handleDeleteItem(refeicao, index)}><TiDelete size={23} color="green" /></button></p>
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

      <div>
        {day && (
          <p><b>Total de Calorias :</b> {calculateTotalCalories()[day]} kCal</p>
        )}
      </div>


      <div className='form-group'>
        <button onClick={salvarDieta}> Salvar Dieta </button>
      </div>
    </div>
  );
}

export default DayButtons;
