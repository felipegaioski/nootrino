'use client'
import { useForm } from "react-hook-form";


import { isEmpty } from "lodash";

const Form = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => { console.log(data) };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register('name', {required: true})}
        />
        {errors?.name?.type === 'required' && <p className="error-message">O nome é obrigatório</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register('email', {required: true})}
        />
        {errors?.email && <p className="error-message">O email é obrigatório</p>}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register('password', { required: true, minLength: 7} )}
        />
        {errors?.password?.type === 'minLength' && (
          <p className="error-message">A senha deve conter pelo menos 7 caracteres</p>
        )}
        {errors?.password?.type === 'required' && (
          <p className="error-message">A senha é obrigatória</p>
        )}
      </div>

      <div className="form-group">
        <label>CRN</label>
        <select
          // className={errors?.profession && "input-error"}
          {...register('crn')}
        >
          <option value="0">Selecione a região...</option>
          <option value="crn1">CRN 1</option>
          <option value="crn2">CRN 2</option>
          <option value="crn3">CRN 3</option>
          <option value="crn4">CRN 4</option>
          <option value="crn5">CRN 5</option>
          <option value="crn6">CRN 6</option>
          <option value="crn7">CRN 7</option>
          <option value="crn8">CRN 8</option>
          <option value="crn9">CRN 9</option>
          <option value="crn10">CRN 10</option>
          <option value="crn11">CRN 11</option>
          <option value="crn12">CRN 12</option>
        </select>
        <br></br>
        <label>Inscrição</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Inscrição"
          {...register('inscricao', {required: true})}
        />
        {errors?.name?.type === 'required' && <p className="error-message">O número da inscrição é obrigatório</p>}
      </div>

      {/* 
      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register('privacyTerms')}
          />
          <label>Eu concordo com os termos de privacidade.</label>
        </div>

        {errors?.privacyTerms && (
          <p className="error-message">{errors?.privacyTerms}</p>
        )}
      </div>
      */}

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default Form;