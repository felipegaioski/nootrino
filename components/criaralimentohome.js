import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import 'firebase/firestore';

const CriarAlimento = () => {
    const [newNome, setNewNome] = useState("");
    const [newQuantidade, setNewQuantidade] = useState(0);
    const [newPorcao, setNewPorcao] = useState(0);
    const [newUnidade, setNewUnidade] = useState("");
    const [newCalorias, setNewCalorias] = useState(0);

    const foodColletctionRef = collection(db, "alimentos")

    const resetForm = () => {
        setNewNome("");
        setNewQuantidade(0);
        setNewPorcao(0);
        setNewUnidade("");
        setNewCalorias(0);
    };

    const createFood = async () => {

        if (
            newNome.trim() === "" ||
            newQuantidade <= 0 ||
            newPorcao <= 0 ||
            newUnidade.trim() === "" ||
            newCalorias <= 0
        ) {
            alert("Por favor, preencha com atributos válidos");
            return;
        }


        await addDoc(foodColletctionRef, { nome: newNome, quantidade: Number(newQuantidade), porcao: Number(newPorcao), unidade: newUnidade, calorias: newCalorias });

        alert('Alimento criado com sucesso!');

        resetForm();
        document.getElementById("input-name").value = "";
        document.getElementById("input-quant").value = "";
        document.getElementById("input-porcao").value = "";
        document.getElementById("input-unidade").value = "";
        document.getElementById("input-calorias").value = "";
    }

    return (
        <div className='form-group'>
            <label>Nome da comida</label>
            <input id="input-name" placeholder="Nome" onChange={(event) => { setNewNome(event.target.value) }} />
            <br></br>
            <label>Quantidade</label>
            <input id="input-quant" type="number" placeholder="Quantidade em gramas ou ml" onChange={(event) => { setNewQuantidade(event.target.value) }} />
            <br></br>
            <label>Porção</label>
            <input id="input-porcao" type="number" placeholder="Medida caseira (número)" onChange={(event) => { setNewPorcao(event.target.value) }} />
            <br></br>
            <label>Unidade</label>
            <input id="input-unidade" placeholder="Unidade (ex: fatias, colheres)" onChange={(event) => { setNewUnidade(event.target.value) }} />
            <br></br>
            <label>Quantidade de calorias</label>
            <input id="input-calorias" type="number" placeholder="Calorias" onChange={(event) => { setNewCalorias(event.target.value) }} />
            <br></br>
            <button onClick={createFood}> Criar Alimento </button>
        </div>
    )
}

export default CriarAlimento;