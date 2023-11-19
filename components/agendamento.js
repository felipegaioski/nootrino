//import { Datepicker } from './datepicker'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Agendamento = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleAgendamento = () => {

  }

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Paciente</label>
        <input
          type="text"
          placeholder="Selecione o paciente"
        />
      </div>

      <div className="form-group">
        <label>Selecione a data</label>
        <DatePicker selected={startDate} dateFormat="dd/MM/yy" onChange=
          {(date) => setStartDate(date)} />
      </div>

      <div className="form-group">
        <label>Local</label>
        <input
          type="text"
          placeholder="Digite o local da consulta"
        />
      </div>

      <div className="form-group">
        <button onClick={handleAgendamento}>Agendar consulta</button>
      </div>
    </div>

  );
};

export default Agendamento;