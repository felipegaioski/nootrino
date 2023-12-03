'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const ShowMedidas = ({ onMedidasCreated }) => {
    const [nomePaciente, setNomePaciente] = useState('');
    const [codPaciente, setCodPaciente] = useState(null);
    // Pegar código a partir da url
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const { id, nome } = params;
        setCodPaciente(id);
        setNomePaciente(nome);
    }, []);

    let cod_nutri;
    if (typeof window !== 'undefined') {
        cod_nutri = localStorage.getItem('cod_user');
    }
    const [medidas, setMedidas] = useState([]);

    const fetchMedidas = async () => {
        const atendColletctionRef = collection(db, "medidas");
        const data = await getDocs(atendColletctionRef);
        const atends = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const filteredMedidas = atends.filter(atend => atend.cod_nutri === cod_nutri && atend.cod_paciente === codPaciente);
        setMedidas(filteredMedidas);
    };

    const handleDelete = async (medidaId) => {
        Swal.fire({
            title: "Deseja realmente excluir essa medida?",
            text: "Não será possível recuperá-la!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#32bb67",
            cancelButtonColor: "#d33",
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, 'medidas', medidaId));
                    fetchMedidas();
                } catch (error) {
                    console.error("Error deleting medidas: ", error);
                }
                // Swal.fire({
                //     title: "Medida excluída!",
                //     icon: "success",
                //     confirmButtonColor: "#32bb67"
                // });
            }
        });
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
        <div className="container mx-auto p-4">
            <div>
                <h1 className='text-xl font-bold text-green'>{nomePaciente}</h1>
            </div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full border">
                    <thead>
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
                            <th className="border-b"></th>
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
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(medida.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ShowMedidas;
