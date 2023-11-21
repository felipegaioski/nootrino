import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ShowMedidasPaciente = () => {
    const cod_user = localStorage.getItem('cod_user');
    const nome_nutri = localStorage.getItem('nome_nutri');
    const [medidas, setMedidas] = useState([]);

    const fetchMedidas = async () => {
        const atendColletctionRef = collection(db, "medidas");
        const data = await getDocs(atendColletctionRef);
        const medidas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredMedidas = medidas.filter(medida => medida.cod_paciente == cod_user);
        setMedidas(filteredMedidas);
    };

    useEffect(() => {
        fetchMedidas();
    }, []);

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
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowMedidasPaciente;
