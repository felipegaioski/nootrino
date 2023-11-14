'use client'
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const DietForm = ({ onSubmit, defaultValues }) => {
  const { handleSubmit, control, register } = useForm({
    defaultValues: defaultValues || {}, // Preenche os valores padrão para edição
  });

  const onSubmitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <div className='app-container'>
        <form className="form-group" onSubmit={handleSubmit(onSubmitHandler)}>
        <label>Dia da Semana</label>
        <select {...register('day')}>
            <option value="monday">Segunda-feira</option>
            <option value="tuesday">Terça-feira</option>
            <option value="wednesday">Quarta-feira</option>
            <option value="thursday">Quinta-feira</option>
            <option value="friday">Sexta-feira</option>
            <option value="saturday">Sábado</option>
            <option value="sunday">Domingo</option>
        </select>
        <br></br>
        <label>Refeição</label>
        <select {...register('meal')}>
            <option value="cafe">Café da Manhã</option>
            <option value="colacao">Colação</option>
            <option value="almoco">Almoço</option>
            <option value="lanche">Lanche da tarde</option>
            <option value="jantar">Jantar</option>
            <option value="ceia">Ceia</option>
            <option value="pre">Pré Treino</option>
            <option value="pos">Pós Treino</option>
        </select>
        <br></br>
        <label>Dieta</label>
        <textarea {...register('diet')} />

        <button type="submit">Salvar</button>
        </form>
    </div>
  );
};

export default DietForm;
