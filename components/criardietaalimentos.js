import React, { useState, useEffect } from 'react';
import {db} from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import 'firebase/firestore';
import Select from 'react-select'
import CriarAlimento from './criaralimento';
import { IoClose } from "react-icons/io5";
import PlanoAlimentarPage from './showdieta';
import DayButtons from './show';

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

  //States para Selects
  const [planoAlimentar, setPlanoAlimentar] = useState([]);
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

  //State para calcular calorias
  const [totalCalories, setTotalCalories] = useState(0);

  const foodColletctionRef = collection(db, "alimentos")

  //Buscar no firebase as comidas na collection alimentos
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
      /*
      setMealPlan({
        ...mealPlan,
        [selectedMeal.value]: [...mealPlan[selectedMeal.value], selectedFood.value],
      });
      */

      temp.append()
      setSelectedFood(null);
      setSelectedMeal(null);
      setSelectedDay(null);
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

    const handleFoodChange = (selectedOption) => {
        setSelectedFood(selectedOption);
    };

    const handleAddFood = () => {
        if (selectedFood) {
          //selectedFood.value = {quantidade: 1, nome: 'Bolo de Fubá', calorias: '150', unidade: 'fatia'}
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

      <DayButtons />



      {/* Total Calories */}
      <p className='p-[2rem]'>Total Calories: {totalCalories}</p>
      <PlanoAlimentarPage /> 

    </div>
  );
};

export default MealPlanBuilder;