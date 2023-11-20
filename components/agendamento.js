import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';

const Agendamento = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('12:00'); // Initial time value

  const handleAgendamento = () => {
    // Add your logic for handling the appointment here
  };

  const validateDate = (selectedDate) => {
    const currentDate = new Date();
    return selectedDate >= currentDate;
  };

  const validateTime = (selectedTime) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const [selectedHour, selectedMinutes] = selectedTime.split(':');

    if (parseInt(selectedHour, 10) === currentHour) {
      return parseInt(selectedMinutes, 10) > currentMinutes;
    }

    return parseInt(selectedHour, 10) > currentHour;
  };

  const handleDateChange = (date) => {
    if (validateDate(date)) {
      setStartDate(date);
    } else {
      // Handle invalid date (e.g., show an error message)
      console.log("Invalid date selected");
    }
  };

  const handleTimeChange = (time) => {
    if (validateTime(time)) {
      setStartTime(time);
    } else {
      // Handle invalid time (e.g., show an error message)
      console.log("Invalid time selected");
    }
  };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Paciente</label>
        <input type="text" placeholder="Selecione o paciente" />
      </div>

      <div className="form-group">
        <label>Selecione a data</label>
        <DatePicker selected={startDate} dateFormat="dd/MM/yy" onChange={handleDateChange} />
      </div>

      <div>
        <label>Selecione a hora</label>
        <TimePicker value={startTime} onChange={handleTimeChange} />
      </div>

      <div className="form-group">
        <label>Local</label>
        <input type="text" placeholder="Digite o local da consulta" />
      </div>

      <div className="form-group">
        <button onClick={handleAgendamento}>Agendar consulta</button>
      </div>
    </div>
  );
};

export default Agendamento;
