import { useForm } from "react-hook-form";

//import { Datepicker } from './datepicker'
import React, { useState } from 'react'; 
import DatePicker from 'react-datepicker/dist/react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 

const Agendamento = () => {
    const [startDate, setStartDate] = useState(new Date()); 

    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => { console.log(data) };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Selecione a data</label>
        <DatePicker selected={startDate} dateFormat="dd/MM/yy" onChange= 
              {(date) => setStartDate(date)} /> 
      </div>

      <div className="form-group">
        <label>Local</label>
        <input
          // className={errors?.email && "input-error"}
          type="text"
          placeholder="Digite o local da consulta"
          {...register('local', {required: true})}
        />
        {/* {errors?.email && <p className="error-message">{errors?.email}</p>} */}
      </div>
      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Agendar consulta</button>
      </div>
    </div>
    
  );
};

export default Agendamento;