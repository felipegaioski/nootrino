import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import 'firebase/firestore';
import Select from 'react-select'

const CriarAlimento = () => {
    const [newNome, setNewNome] = useState("");
    const [newQuantidade, setNewQuantidade] = useState(0);
    const [newPorcao, setNewPorcao] = useState(0);
    const [newUnidade, setNewUnidade] = useState("");
    const [newCalorias, setNewCalorias] = useState(0);
    const [selectedUnidade, setSelectedUnidade] = useState(null);
    const options = [

        { value: 'opcao1', label: 'Barra(s)' },
        { value: 'opcao2', label: 'Colher(es) de Chá' },
        { value: 'opcao3', label: 'Colher(es) Média(s)' },
        { value: 'opcao4', label: 'Colher(es) de Sopa' },
        { value: 'opcao5', label: 'Colher(es) de Servir' },
        { value: 'opcao6', label: 'Copo(s) Grande(s)' },
        { value: 'opcao7', label: 'Copo(s) Pequeno(s)' },
        { value: 'opcao8', label: 'Fatia(s) Pequena(s)' },
        { value: 'opcao9', label: 'Fatia(s) Fina(s)' },
        { value: 'opcao10', label: 'Fatia(s) Média(s)' },
        { value: 'opcao11', label: 'Fatia(s) Grande(s)' },
        { value: 'opcao12', label: 'Folha(s)' },
        { value: 'opcao13', label: 'Gomo(s)' },
        { value: 'opcao14', label: 'Lata(s)' },
        { value: 'opcao15', label: 'Pacote(s)' },
        { value: 'opcao16', label: 'Ramo(s)' },
        { value: 'opcao17', label: 'Unidade(s) Pequena(s)' },
        { value: 'opcao18', label: 'Unidade(s) Média(s)' },
        { value: 'opcao19', label: 'Unidade(s) Grande(s)' }

    ];

    const handleSelectedOption = (selectedOption) => {
        setSelectedUnidade(selectedOption);
    };
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
            newCalorias <= 0
        ) {
            alert("Por favor, preencha com atributos válidos");
            return;
        }

        const data = await getDocs(foodColletctionRef);
        const comidas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const hasDuplicate = comidas.some((comida) => comida.nome.toLowerCase() === newNome.toLowerCase());

        if (hasDuplicate) {
            alert(`Já existe um alimento com o nome ${newNome}!`);
        } else {
            await addDoc(foodColletctionRef, {
                nome: newNome,
                quantidade: Number(newQuantidade),
                porcao: Number(newPorcao),
                unidade: selectedUnidade.label,
                calorias: newCalorias
            });
        };

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
            <Select placeholder="Selecione a unidade"
                value={selectedUnidade}
                onChange={handleSelectedOption}
                options={options}
            />
            <br></br>
            <label>Quantidade de calorias</label>
            <input id="input-calorias" type="number" placeholder="Calorias" onChange={(event) => { setNewCalorias(event.target.value) }} />
            <br></br>
            <button onClick={createFood}> Criar Alimento </button>
        </div>
    )
}

export default CriarAlimento;