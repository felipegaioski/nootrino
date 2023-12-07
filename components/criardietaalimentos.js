import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, getDoc, addDoc, setDoc } from 'firebase/firestore';
import 'firebase/firestore';
import Select from 'react-select'
import CriarAlimento from './criaralimento';
import DayButtons from './show';

const MealPlanBuilder = () => {
  const [nomePaciente, setNomePaciente] = useState('');

  let cod_nutri;
  if (typeof window !== 'undefined') {
    cod_nutri = localStorage.getItem('cod_user');
  }
  let codPaciente;

  // Pegar código a partir da url
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const { id, nome } = params;
      codPaciente = id;
      setNomePaciente(nome);
    }
  }, []);

  // Aparecer a Criação de alimento quando clica o botão Novo Alimento
  const [showNovoAlimento, setShowNovoAlimento] = useState(false);

  const handleButtonClick = () => {
    setShowNovoAlimento(true);
  };

  const updateFoodDataAndHideAlimento = async () => {
    await fetchFoodData();
    setShowNovoAlimento(false);
  };

  //States para Selects
  const [selectedDay, setSelectedDay] = useState(null);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedQuant, setSelectedQuant] = useState(null);
  const [porcao, setNewPorcao] = useState(null);

  // Objeto para guardar os itens da dieta (só vai ser salvo no firebase no final)
  const [dieta, setDieta] = useState({
    cod_nutri: "",
    cod_paciente: "",
    nome: "",
    dias: {
      segunda_feira: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
      terca_feira: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
      quarta_feira: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
      quinta_feira: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
      sexta_feira: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
      sabado: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
      domingo: {
        refeicoes: {
          cafe: {
            comidas: []
          },
          colacao: {
            comidas: []
          },
          almoco: {
            comidas: []
          },
          lanche: {
            comidas: []
          },
          jantar: {
            comidas: []
          },
          ceia: {
            comidas: []
          },
          pre_treino: {
            comidas: []
          },
          pos_treino: {
            comidas: []
          }
        }
      },
    }
  });

  let food = {
    nome: "",
    quantidade: 0,
    porcao: 0,
    unidade: 0,
    calorias: 0
  };

  let dieta_id;

  const fetchDietaData = async () => {
    // buscar dieta no firebase
    const dietaColletctionRef = collection(db, "dietas");
    const data = await getDocs(dietaColletctionRef);
    const dietas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const dieta_doc = dietas.find((dieta) => dieta.cod_paciente === codPaciente);

    if (dieta_doc) {
      setDieta(dieta_doc);
      if (typeof window !== 'undefined') {
        localStorage.setItem('doc_id', dieta_doc.id);
        dieta_id = dieta_doc.id;
      }
    } else {
      //alert(codPaciente)
      dieta.cod_paciente = codPaciente;
      dieta.cod_nutri = cod_nutri;
    }
  };

  useEffect(() => {
    fetchDietaData();
  }, []);

  const foodColletctionRef = collection(db, "alimentos")
  const fetchFoodData = async () => {
    try {
      const snapshot = await getDocs(foodColletctionRef);
      const foods = snapshot.docs.map(doc => doc.data());
      setFoods(foods);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  const addFoodToMealPlan = () => {
    if (selectedFood && selectedMeal && selectedDay) {

      if (selectedQuant === null) {
        alert("Informe a quantidade do alimento");
        return;
      }

      food = JSON.parse(JSON.stringify(selectedFood.value));
      food.quantidade = selectedQuant;
      food.porcao = Math.round(parseFloat(selectedQuant * Number(selectedFood.value.porcao) / Number(selectedFood.value.quantidade)).toFixed());
      if (food.porcao == 0) {
        food.porcao = 1;
      }
      food.calorias = parseFloat((selectedQuant * Number(selectedFood.value.calorias) / Number(selectedFood.value.quantidade)).toFixed(1));
      //food.calorias.toFixed(1);

      if (
        dieta.dias[selectedDay.value] &&
        dieta.dias[selectedDay.value].refeicoes[selectedMeal.value]
      ) {
        dieta.dias[selectedDay.value].refeicoes[selectedMeal.value].comidas.push(food);

        setSelectedFood(null);
        //setSelectedMeal(null);
        //setSelectedDay(null);
        //setSelectedQuant(null);
      } else {
        //console.log(dieta)
        alert('Dia ou Refeição inválida');
      }
    } else {
      alert('Por favor, selecione o dia da semana, a refeição e o alimento para adicionar');
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleFoodChange = (selectedOption) => {
    setSelectedFood(selectedOption);
  };

  const handleAddFood = () => {
    if (selectedFood) {
      addFoodToMealPlan();
    }
  };

  const handleMealChange = (selectedOption) => {
    setSelectedMeal(selectedOption);
  };

  const handleDayChange = (selectedOption) => {
    setSelectedDay(selectedOption);
  };

  const handleQuantChange = (event) => {
    setSelectedQuant(event.target.value);
  };

  const handleDietaNomeChange = (event) => {
    const novoNome = event.target.value;
    setDieta((prevDieta) => ({ ...prevDieta, nome: novoNome }));
  };

  return (
    <div className='flex flex-col align-center items-center w-full'>
      <div>
        <h1 className='text-xl font-bold text-green'>{nomePaciente}</h1>
      </div>
      <div className='form-group'>

        {/* Day Selection */}
        <div className="form-group">
          <h2 className="h2-title font-bold">Selecione o dia da semana</h2>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            options={[
              { value: 'segunda_feira', label: 'Segunda-feira' },
              { value: 'terca_feira', label: 'Terça-feira' },
              { value: 'quarta_feira', label: 'Quarta-feira' },
              { value: 'quinta_feira', label: 'Quinta-feira' },
              { value: 'sexta_feira', label: 'Sexta-feira' },
              { value: 'sabado', label: 'Sábado' },
              { value: 'domingo', label: 'Domingo' }
            ]}
            isSearchable
          />
        </div>

        {/* Meal Selection */}
        <div className='form-group'>
          <h2 className='h2-title font-bold'>Selecione a refeição</h2>
          <Select
            value={selectedMeal}
            onChange={handleMealChange}
            options={[
              { value: 'cafe', label: 'Café da manhã' },
              { value: 'colacao', label: 'Colação' },
              { value: 'almoco', label: 'Almoço' },
              { value: 'lanche', label: 'Lanche da tarde' },
              { value: 'jantar', label: 'Jantar' },
              { value: 'ceia', label: 'Ceia' },
              { value: 'pre_treino', label: 'Pré-treino' },
              { value: 'pos_treino', label: 'Pós-treino' },
            ]}
            isSearchable
          />
        </div>

        {/* Food Selection */}
        <div className='form-group'>
          <h2 className='h2-title font-bold'>Selecione o alimento</h2>
          <Select
            value={selectedFood}
            onChange={handleFoodChange}
            options={foods.map((food) => ({ value: food, label: food.nome }))}
            isSearchable
          />
        </div>

        {selectedFood && (
          <div className='form-group'>
            <h2 className='h2-title font-bold'>Informações do Alimento Selecionado</h2>
            <p><strong>Nome:</strong> {selectedFood.value.nome}</p>
            <p><strong>Quantidade:</strong> {selectedFood.value.quantidade} gramas ou ml</p>
            <p><strong>Medida caseira:</strong> {selectedFood.value.porcao} {selectedFood.value.unidade}</p>
            <p><strong>Calorias:</strong> {selectedFood.value.calorias} kcal</p>
          </div>
        )}

        {/* Quantidade */}
        <div className='form-group'>
          <h2 className='h2-title font-bold'>Quantidade</h2>
          <input
            type="number"
            onChange={(event) => { handleQuantChange(event) }}
            placeholder="Digite a quantidade em gramas ou ml"
          />
        </div>

        <button onClick={handleAddFood}>Adicionar</button>
      </div>

      <br></br>
      <div className='form-group'>
        {/* Input para editar o nome da dieta */}
        <label htmlFor="dietaNome" className="font-bold text-lg">Nome da Dieta:</label>
        <input
          type="text"
          id="dietaNome"
          value={dieta.nome}
          onChange={handleDietaNomeChange}
          placeholder="Digite o nome da dieta"
          className="border p-2"
        />
      </div>
      <br></br>
      <DayButtons dieta={dieta} setDieta={setDieta} dieta_id={dieta_id} codpaciente={codPaciente} />
      <br></br>
      <div className='flex items-center justify-center gap-[20px] form-group'>
        {!showNovoAlimento && <button onClick={handleButtonClick} className='max-w-[200px]'>Criar Novo Alimento</button>}
        {showNovoAlimento && <CriarAlimento onUpdate={updateFoodDataAndHideAlimento} />}
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default MealPlanBuilder;