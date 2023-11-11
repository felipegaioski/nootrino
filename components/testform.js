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
        {errors?.name?.type === 'required' && <p className="error-message">Name is required</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          // className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register('email', {required: true})}
        />
        {/* {errors?.email && <p className="error-message">{errors?.email}</p>} */}
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
          <p className="error-message">Password must have at least 7 characters</p>
        )}
        {errors?.password?.type === 'required' && (
          <p className="error-message">Password is required</p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          // className={errors?.profession && "input-error"}
          {...register('profession')}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {/* {errors?.profession && (
          <p className="error-message">{errors?.profession}</p>
        )} */}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register('privacyTerms')}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {/* {errors?.privacyTerms && (
          <p className="error-message">{errors?.privacyTerms}</p>
        )} */}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default Form;