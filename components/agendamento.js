'use client'
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import Select from 'react-select'
import ShowAtendimentos from '@/components/showatendimentos';

const Agendamento = () => {
  // Mostrar ou esconder formulário
  const [showAgendamento, setShowAgendamento] = useState(false);  // Initialize state
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('12:00'); // Initial time value
  //const [timestamp, setTimestamp] = useState(null);
  const [local, setLocal] = useState('')
  const [atendimentoCreated, setAtendimentoCreated] = useState(false);

  // Buscar e selecionar paciente
  const [selectedPaciente, setSelectedPaciente] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [usersColletctionRef, setUsersColletctionRef] = useState(null);

  let cod_nutri;
  if (typeof window !== 'undefined') {
    cod_nutri = localStorage.getItem('cod_user');
  }

  const fetchPacientes = async () => {
    const usersColletctionRef = collection(db, "user");
    setUsersColletctionRef(usersColletctionRef);
    const data = await getDocs(usersColletctionRef);
    const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const filteredUsers = users.filter(user => user.paciente === true && user.cod_nutri === cod_nutri);

    setPacientes(filteredUsers);
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handlePacienteChange = (selectedOption) => {
    setSelectedPaciente(selectedOption);
  };

  const handleButtonClick = () => {
    setShowAgendamento(true);
  };

  const validateDate = (selectedDate) => {
    const currentDate = new Date();
    return selectedDate >= currentDate;
  };

  const handleDateChange = (date) => {
    if (validateDate(date)) {
      setStartDate(date);
    } else {
      alert("Por favor, selecione uma data futura");
    }
  };

  const handleTimeChange = (time) => {
    setStartTime(time);
  };

  const handleAgendamento = async () => {
    // Combine selected date and time into a single timestamp
    const selectedDateTime = new Date(startDate);
    const [hours, minutes] = startTime.split(':');
    selectedDateTime.setHours(parseInt(hours, 10));
    selectedDateTime.setMinutes(parseInt(minutes, 10));

    // Convert to Firestore Timestamp
    const timestamp = Timestamp.fromDate(selectedDateTime);

    const atendColletctionRef = collection(db, "atendimentos");
    await addDoc(atendColletctionRef, {
      paciente: selectedPaciente.value.nome, cod_nutri: cod_nutri, cod_paciente: selectedPaciente.value.cod_user,
      data: timestamp, local: local
    });
    //alert("Atendimento criado com sucesso!");

    setAtendimentoCreated(true);
    setShowAgendamento(false);
  };

  return (
    <div className="app-container">
      <ShowAtendimentos onAtendimentoCreated={() => setAtendimentoCreated(false)} />
      <div className="form-group">
        {!showAgendamento && <button onClick={handleButtonClick}>Novo Agendamento</button>}
      </div>

      {showAgendamento && (
        <div>
          <div className='form-group '>
            <h2 className='h2-title font-bold'>Selecione o paciente</h2>
            <Select
              value={selectedPaciente}
              onChange={handlePacienteChange}
              options={pacientes.map((user) => ({ value: user, label: user.nome }))}
              isSearchable
            />
          </div>

          <div className="form-group">
            <label>Selecione a data</label>
            <DatePicker selected={startDate} dateFormat="dd/MM/yy" onChange={handleDateChange} />
          </div>

          <div class="form-group">
            <label for="timepicker">Selecione a Hora</label>
            <input type="time" id="timepicker" value={startTime} onChange={(e) => handleTimeChange(e.target.value)}></input>
          </div>

          <div className="form-group">
            <label>Local</label>
            <input type="text" placeholder="Digite o local da consulta" onChange={(e) => setLocal(e.target.value)} />
          </div>

          <div className="form-group">
            <button onClick={handleAgendamento}>Agendar consulta</button>
            <br></br>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agendamento;
