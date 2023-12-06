import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ShowMedidasPaciente = () => {
    let cod_user;
    let nome_nutri;
    if (typeof window !== 'undefined') {
        cod_user = localStorage.getItem('cod_user');
        nome_nutri = localStorage.getItem('nome_nutri');
    }
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
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full border">
                    <thead className='font-light'>
                        <tr>
                            <th className="border-b">Altura (cm)</th>
                            <th className="border-b">Peso (kg)</th>
                            <th className="border-b">IMC</th>
                            <th className="border-b">Porcentagem de Gordura</th>
                            <th className="border-b">Circunferência dos Braços</th>
                            <th className="border-b">Circunferência das Pernas</th>
                            <th className="border-b">Circunferência do Abdômen</th>
                            <th className="border-b">Data</th>
                            <th className="border-b">Observações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medidas.map((medida, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{medida.altura} cm</td>
                                <td className="py-2 px-4 border-b">{medida.peso} kg</td>
                                <td className="py-2 px-4 border-b">{medida.imc}</td>
                                <td className="py-2 px-4 border-b">{medida.massa_gorda} %</td>
                                <td className="py-2 px-4 border-b">{medida.circunferencia_bracos} cm</td>
                                <td className="py-2 px-4 border-b">{medida.circunferencia_pernas} cm</td>
                                <td className="py-2 px-4 border-b">{medida.circunferencia_abdomen} cm</td>
                                <td className="py-2 px-4 border-b">{formatDate(medida.data)}</td>
                                <td className="py-2 px-4 border-b">{medida.obs}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ShowMedidasPaciente;
