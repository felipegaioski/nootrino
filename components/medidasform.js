'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import 'firebase/firestore';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ShowMedidas from '@/components/showmedidas'

const AtualizarMedida = () => {
  const [newPeso, setNewPeso] = useState('');
  const [newAltura, setNewAltura] = useState('');
  const [newObs, setNewObs] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [newMassa_gorda, setNewMassa_gorda] = useState('');
  const [newImc, setNewImc] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [medidasCreated, setMedidasCreated] = useState(false);
  const [newCircunferenciaBracos, setNewCircunferenciaBracos] = useState('');
  const [newCircunferenciaPernas, setNewCircunferenciaPernas] = useState('');
  const [newCircunferenciaAbdomen, setNewCircunferenciaAbdomen] = useState('');

  let cod_nutri;
  if (typeof window !== 'undefined') {
    cod_nutri = localStorage.getItem('cod_user');
  }

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

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const measuresCollectionRef = collection(db, 'medidas');
  const userCollectionRef = collection(db, 'user');

  const fetchMedidas = async () => {

  };
  useEffect(() => {
    fetchMedidas();
  }, []);

  const calcularImc = () => {
    if (!newPeso.trim() || !newAltura.trim()) {
      return;
    }

    const peso = parseFloat(newPeso);
    const altura = newAltura / 100;

    if (isNaN(peso) || isNaN(altura) || altura === 0 || peso === 0) {
      alert('Peso e altura devem ser números válidos maiores que zero.');
      return;
    }

    const imcValue = (peso / Math.pow(altura, 2));
    setNewImc(imcValue.toFixed(2));
  };

  const validateDate = (selectedDate) => {
    const currentDate = new Date();
    return selectedDate <= currentDate;
  };

  const handleDateChange = (date) => {
    if (validateDate(date)) {
      setStartDate(date);
    } else {
      alert("Por favor, selecione uma data válida");
    }
  };

  const validateFields = () => {
    const peso = Number(newPeso);
    const altura = Number(newAltura);
    const percentualGordura = Number(newMassa_gorda);

    if (peso <= 0 || altura <= 0 || percentualGordura <= 0 ||
      Number(newCircunferenciaBracos) <= 0 ||
      Number(newCircunferenciaPernas) <= 0 ||
      Number(newCircunferenciaAbdomen) <= 0) {
      alert('Todos os campos devem ser maiores que zero.');
      return false;
    }

    return true;
  };


  const salvarMedida = async () => {
    const selectedDateTime = new Date(startDate);
    const timestamp = Timestamp.fromDate(selectedDateTime);

    if (!validateFields()) {
      return;
    }

    await addDoc(measuresCollectionRef, {
      altura: newAltura,
      cod_nutri: cod_nutri,
      cod_paciente: codPaciente,
      data: timestamp,
      massa_gorda: newMassa_gorda,
      circunferencia_bracos: Number(newCircunferenciaBracos),
      circunferencia_pernas: Number(newCircunferenciaPernas),
      circunferencia_abdomen: Number(newCircunferenciaAbdomen),
      peso: Number(newPeso),
      imc: Number(newImc),
      obs: newObs
    });

    //alert("Registro de medidas criado com sucesso!");

    setMedidasCreated(true);
    setShowForm(false);
  };

  const handlePesoChange = (event) => {
    setNewPeso(event.target.value);
  };

  const handleAlturaChange = (event) => {
    setNewAltura(event.target.value);
  };

  const handleMedidaCreated = () => {
    setMedidasCreated(!medidasCreated);
  };

  useEffect(() => {
    calcularImc();
  }, [newPeso, newAltura]);

  return (
    <div className="app-container">
      <ShowMedidas onMedidasCreated={handleMedidaCreated} />
      <div className="form-group">
        {!showForm && <button onClick={handleButtonClick}>Novo Registro de Medidas</button>}
      </div>
      {showForm && (<div>
        <div className="form-group">
          <label>Peso (kg)</label>
          <input
            type="number"
            placeholder="Digite o peso do paciente"
            value={newPeso}
            onChange={handlePesoChange}
          />
        </div>

        <div className="form-group">
          <label>Altura (cm)</label>
          <input
            type="number"
            placeholder="Digite a altura do paciente"
            value={newAltura}
            onChange={handleAlturaChange}
          />
        </div>

        <div className="imc-result form-group">
          <h4><b className='text-[#3cb651]'>IMC:</b> {newImc}</h4>
        </div>

        <div className="form-group">
          <label>Percentual de Gordura</label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="number"
              placeholder="         Digite o percentual de gordura do paciente."
              value={newMassa_gorda}
              onChange={(event) => setNewMassa_gorda(event.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                position: 'relative',
                background: 'transparent',
                zIndex: '1',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: '450px',
                transform: 'translateY(-50%)',
                zIndex: '2',
              }}
            >
              %
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Circunferência dos Braços (cm)</label>
          <input
            type="number"
            placeholder="Digite a circunferência dos braços do paciente"
            value={newCircunferenciaBracos}
            onChange={(event) => setNewCircunferenciaBracos(event.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Circunferência das Pernas (cm)</label>
          <input
            type="number"
            placeholder="Digite a circunferência das pernas do paciente"
            value={newCircunferenciaPernas}
            onChange={(event) => setNewCircunferenciaPernas(event.target.value)}
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Circunferência do Abdômen (cm)</label>
          <input
            type="number"
            placeholder="Digite a circunferência do abdômen do paciente"
            value={newCircunferenciaAbdomen}
            onChange={(event) => setNewCircunferenciaAbdomen(event.target.value)}
            min="0"
          />
        </div>


        <div className="form-group">
          <label>Selecione a data</label>
          <DatePicker selected={startDate} dateFormat="dd/MM/yy" onChange={handleDateChange} />
        </div>

        <div className="form-group">
          <label>Observações</label>
          <textarea
            placeholder="Digite aqui as observações..."
            value={newObs}
            onChange={(event) => setNewObs(event.target.value)}
            style={{
              width: '100%',
              padding: '10px 15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div className="form-group">
          <button onClick={salvarMedida}>Salvar Medidas</button>
        </div>

      </div>)}

    </div>

  );
};

export default AtualizarMedida;