import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import 'firebase/firestore';

const CriarAlimento = ({ onUpdate }) => {
    const [newNome, setNewNome] = useState("");
    const [newQuantidade, setNewQuantidade] = useState(0);
    const [newPorcao, setNewPorcao] = useState(0);
    const [newUnidade, setNewUnidade] = useState("");
    const [newCalorias, setNewCalorias] = useState(0);

    const foodColletctionRef = collection(db, "alimentos")

    const createFood = async () => {

        if (
            newNome.trim() === "" ||
            newQuantidade <= 0 ||
            newPorcao <= 0 ||
            newUnidade.trim() === "" ||
            newCalorias <= 0
        ) {
            alert("Por favor, preencha todos os atributos do alimento");
            return;
        }
        await addDoc(foodColletctionRef, { nome: newNome, quantidade: Number(newQuantidade), porcao: Number(newPorcao), unidade: newUnidade, calorias: newCalorias });
        onUpdate();
    }

    return (
        <div className='form-group'>
            <label>Nome da comida</label>
            <input placeholder="Nome" onChange={(event) => { setNewNome(event.target.value) }} />
            <br></br>
            <label>Quantidade</label>
            <input type="number" placeholder="Quantidade em gramas ou ml" onChange={(event) => { setNewQuantidade(event.target.value) }} />
            <br></br>
            <label>Porção</label>
            <input type="number" placeholder="Medida caseira (número)" onChange={(event) => { setNewPorcao(event.target.value) }} />
            <br></br>
            <label>Unidade</label>
            <input placeholder="Unidade (ex: fatias, colheres)" onChange={(event) => { setNewUnidade(event.target.value) }} />
            <br></br>
            <label>Quantidade de calorias</label>
            <input type="number" placeholder="Calorias" onChange={(event) => { setNewCalorias(event.target.value) }} />
            <br></br>
            <button onClick={createFood}> Criar Alimento </button>
        </div>
    )
}

export default CriarAlimento;