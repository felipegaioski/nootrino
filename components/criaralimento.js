import React, { useState } from 'react';
import {db} from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import 'firebase/firestore';

const CriarAlimento = ( { onUpdate } ) => {
    const [newNome, setNewNome] = useState("");
    const [newQuantidade, setNewQuantidade] = useState(0);
    const [newUnidade, setNewUnidade] = useState("");
    const [newCalorias, setNewCalorias] = useState(0);

    const foodColletctionRef = collection(db, "alimentos")

    const createFood = async () => {
        await addDoc(foodColletctionRef, {nome: newNome, quantidade: Number(newQuantidade), unidade: newUnidade, calorias: newCalorias});

        onUpdate();
    }

    return(
        <div className='form-group'>
            <label>Nome da comida</label>
            <input placeholder="Nome" onChange={(event) => {setNewNome(event.target.value)}}/>
            <br></br>
            <label>Quantidade / porção</label>
            <input type="number" placeholder="Quantidade" onChange={(event) => {setNewQuantidade(event.target.value)}}/>
            <br></br>
            <label>Unidade</label>
            <input placeholder="Unidade" onChange={(event) => {setNewUnidade(event.target.value)}}/>
            <br></br>
            <label>Quantidade de calorias</label>
            <input type="number" placeholder="Calorias" onChange={(event) => {setNewCalorias(event.target.value)}}/>
            <br></br>
            <button onClick={createFood}> Criar Alimento </button>
        </div>
    )
}

export default CriarAlimento;