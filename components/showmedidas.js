import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { TiDelete } from "react-icons/ti";

const ShowMedidas = ({ onMedidasCreated }) => {
    const cod_nutri = localStorage.getItem('cod_user');
    const [medidas, setMedidas] = useState([]);

    const fetchMedidas = async () => {
        const atendColletctionRef = collection(db, "medidas");
        const data = await getDocs(atendColletctionRef);
        const atends = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredMedidas = atends.filter(atend => atend.cod_nutri === cod_nutri);
        setMedidas(filteredMedidas);
    };

    const handleDelete = async (medidaId) => {
        try {
            await deleteDoc(doc(db, 'medidas', medidaId));
            fetchMedidas();
        } catch (error) {
            console.error("Error deleting medidas: ", error);
        }
    };

    useEffect(() => {
        fetchMedidas();
    }, [onMedidasCreated]);

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    };


    return (
        <div>
            <div className='form-group'>
                {medidas.map((medida, index) => (
                    <div key={index}>
                        <p><b>Altura:</b> {medida.altura} cm</p>
                        <p><b>Peso:</b> {medida.peso} kg</p>
                        <p><b>IMC:</b> {medida.imc}</p>
                        <p><b>Porcentagem de gordura:</b> {medida.massa_gorda} %</p>
                        <p><b>Circunferência dos braços:</b> {medida.circunferencia_bracos}</p>
                        <p><b>Circunferência das pernas:</b> {medida.circunferencia_pernas}</p>
                        <p><b>Circunferência do abdômen:</b> {medida.circunferencia_abdomen}</p>
                        <p><b>Data:</b> {formatDate(medida.data)}</p>
                        <p><b>Observações:</b> {medida.obs}</p>
                        <button onClick={() => handleDelete(medida.id)}><TiDelete size={25} color="white" />Excluir</button>
                        {/* <button onClick={() => handleEditClick(medida.id)}>Editar</button> */}
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowMedidas;
