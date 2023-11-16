import React, { useState, useEffect } from 'react';
import {db} from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import 'firebase/firestore';
import Select from 'react-select'
import CriarAlimento from './criaralimento';
import { IoClose } from "react-icons/io5";

const MealPlanBuilder = () => {
  // Aparecer a Criação de alimento quando clica o botão Novo Alimento
  const [showNovoAlimento, setShowNovoAlimento] = useState(false);
  const handleButtonClick = () => {
    setShowNovoAlimento(true);
  };

  const updateFoodDataAndHideAlimento = async () => {
    await fetchFoodData();
    setShowNovoAlimento(false);
  };

  const [selectedDay, setSelectedDay] = useState(null);

  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealPlan, setMealPlan] = useState({
    breakfast: [],
    morningSnack: [],
    lunch: [],
    afternoonSnack: [],
    dinner: [],
    afterDinner: [],
    preWorkout: [],
    postWorkout: [],
  });
  const [totalCalories, setTotalCalories] = useState(0);
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
    if (selectedFood && selectedMeal) {
      setMealPlan({
        ...mealPlan,
        [selectedMeal.value]: [...mealPlan[selectedMeal.value], selectedFood.value],
      });
      setSelectedFood(null);
      setSelectedMeal(null);
    }
  };

  const removeFoodFromMealPlan = (food, mealType) => {
    setMealPlan({
      ...mealPlan,
      [mealType]: mealPlan[mealType].filter(item => item !== food),
    });
  };

  const calculateTotalCalories = () => {
    const total = Object.values(mealPlan)
      .flat()
      .reduce((acc, food) => acc + food.calories, 0);
    setTotalCalories(total);
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  useEffect(() => {
    calculateTotalCalories();
  }, [mealPlan]);

  const createFood = async () => {
    await addDoc(foodColletctionRef, {nome: newNome, quantidade: Number(newQuantidade), unidade: newUnidade, calorias: newCalorias});
  }

  // Function to find food by name
    const findFoodByName = (foodName) => {
        return foods.find((food) => food.nome === foodName);
    };

    const handleFoodChange = (selectedOption) => {
        setSelectedFood(selectedOption);
    };

    const handleAddFood = () => {
        if (selectedFood) {
          addFoodToMealPlan(selectedFood.value, 'breakfast');
          setSelectedFood(null);
        }
    };

    const handleMealChange = (selectedOption) => {
        setSelectedMeal(selectedOption);
    };

    const handleDayChange = (selectedOption) => {
        setSelectedDay(selectedOption);
      };
  
  return (
    <div className='flex flex-col align-center items-center w-full'>
      <div className='form-group'>
        <div className='flex items-center justify-center gap-[20px]'>
          {!showNovoAlimento && <button onClick={handleButtonClick} className='max-w-[200px]'>Novo Alimento</button>}
          {showNovoAlimento  && <CriarAlimento onUpdate={updateFoodDataAndHideAlimento}/>}
        </div>

      {/* Day Selection */}
      <div className="form-group">
          <h2 className="h2-title font-bold">Selecione o dia da semana</h2>
          <Select
            value={selectedDay}
            onChange={handleDayChange}
            options={[
              { value: 'seg', label: 'Segunda-feira' },
              { value: 'ter', label: 'Terça-feira' },
              { value: 'qua', label: 'Quarta-feira' },
              { value: 'qui', label: 'Quinta-feira' },
              { value: 'sex', label: 'Sexta-feira' },
              { value: 'sab', label: 'Sábado' },
              { value: 'dom', label: 'Domingo' }
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
                { value: 'breakfast', label: 'Café da manhã' },
                { value: 'morningSnack', label: 'Colação' },
                { value: 'lunch', label: 'Almoço' },
                { value: 'afternoonSnack', label: 'Lanche da tarde' },
                { value: 'dinner', label: 'Jantar' },
                { value: 'afterDinner', label: 'Ceia' },
                { value: 'preWorkout', label: 'Pré-treino' },
                { value: 'postWorkout', label: 'Pós-treino' },
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

      <button onClick={handleAddFood}>Adicionar</button>
      </div>

      {/* Meal Plan */}
      <div className='flex justify-center flex-col w-full py-[20px]'>
        <table>
          <thead>
            <tr>
              <th>Refeição</th>
              <th>Alimentos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(mealPlan).map(([mealType, foods]) => (
              <tr key={mealType}>
                <td>{mealType}</td>
                <td>
                  <ul>
                    {foods.map(food => (
                      <li key={food.nome}>{food.nome}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {foods.map(food => (
                    <button
                      key={food.nome}
                      onClick={() => removeFoodFromMealPlan(food, mealType)}
                    >
                      Excluir {/*{food.nome}*/}
                      {/*<IoClose size={15}/> */}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Calories */}
      <p className='p-[2rem]'>Total Calories: {totalCalories}</p>
      
    </div>
  );
};

export default MealPlanBuilder;