'use client'
import { useForm } from "react-hook-form";


import { isEmpty } from "lodash";

const Form = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => { console.log(data) };

  return (
    <div className="app-container">
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
          <p className="error-message">A senha tem pelo menos 7 caracteres</p>
        )}
        {errors?.password?.type === 'required' && (
          <p className="error-message">A senha é obrigatória</p>
        )}
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

        {/* {errors?.privacyTerms && (
          <p className="error-message">{errors?.privacyTerms}</p>
        )} 
      </div>
        */}

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Login</button>
      </div>
    </div>
  );
};

export default Form;