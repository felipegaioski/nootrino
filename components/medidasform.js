import { useForm } from "react-hook-form";


import { isEmpty } from "lodash";

const Form = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => { console.log(data) };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Peso</label>
        <input
          className={errors?.name && "input-error"}
          type="number"
          placeholder="Digite o peso do paciente"
          {...register('peso', {required: true})}
        />
        {errors?.name?.type === 'required' && <p className="error-message">Name is required</p>}
      </div>

      <div className="form-group">
        <label>Altura</label>
        <input
          // className={errors?.email && "input-error"}
          type="number"
          placeholder="Digite a altura do paciente"
          {...register('altura', {required: true})}
        />
        {/* {errors?.email && <p className="error-message">{errors?.email}</p>} */}
      </div>
      <div className="form-group">
        <label>Percentual de gordura</label>
        <input
          className={errors?.password && "input-error"}
          type="number"
          placeholder="Digite o percentual de gordura do paciente"
          {...register('gordura', { required: true, minLength: 7} )}
        />
      </div>  
      <div className="form-group">
          <label>Percentual de massa magra</label>
          <input
            className={errors?.password && "input-error"}
            type="number"
            placeholder="Digite o percentual de massa magra do paciente"
            {...register('massa_magra', { required: true, minLength: 7} )}
        />
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default Form;