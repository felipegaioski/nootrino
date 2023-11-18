import React, { useState, useEffect } from 'react';
import {db} from '../firebase-config';
import { collection, addDoc, setDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import 'firebase/firestore';

function DayButtons() {
  const [day, setDay] = useState('');

  const [dieta, setDieta] = useState([]);

  const handleButtonClick = (clickedDay) => {
    setDay(clickedDay);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-7 gap-4">
        <button
          className={`square-button ${day === 'segunda-feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('segunda-feira')}>Segunda-feira</button>
        <button
          className={`square-button ${day === 'terca-feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('terca-feira')}>Terça-feira</button>
          <button
          className={`square-button ${day === 'quarta-feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('quarta-feira')}>Quarta-feira</button>
          <button
          className={`square-button ${day === 'quinta-feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('quinta-feira')}>Quinta-feira</button>
          <button
          className={`square-button ${day === 'sexta-feira' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('sexta-feira')}>Sexta-feira</button>
          <button
          className={`square-button ${day === 'sabado' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('sabado')}>Sábado</button>
          <button
          className={`square-button ${day === 'domingo' ? 'clicked' : ''}`}
          onClick={() => handleButtonClick('domingo')}>Domingo</button>
      </div>
      {day && (
        <div className="mt-4">
          {/* Your table code goes here */}
          <thead>
            <tr>
              <th>Meal</th>
              <th>Foods</th>
            </tr>
          </thead>
          <tbody>
            {/* Table content */}
          </tbody>
        </div>
      )}
    </div>
  );
}

export default DayButtons;
