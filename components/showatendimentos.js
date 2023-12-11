import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ShowAtendimentos = ({ onAtendimentoCreated }) => {
    let cod_nutri;
    if (typeof window !== 'undefined') {
        cod_nutri = localStorage.getItem('cod_user');
    }
    const [atendimentos, setAtendimentos] = useState([]);
    const [orderBy, setOrderBy] = useState('paciente');
    const [orderDirection, setOrderDirection] = useState('asc');
    const [patientFilter, setPatientFilter] = useState('');
    const [dateFilter, setDateFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showAll, setShowAll] = useState(true);
    const [showPast, setShowPast] = useState(false);
    const [showFuture, setShowFuture] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAtendimentos = atendimentos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchAtendimentos = async () => {
        const atendColletctionRef = collection(db, "atendimentos");
        const data = await getDocs(atendColletctionRef);
        const atends = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        let filteredAtends = atends.filter(atend => atend.cod_nutri == cod_nutri);

        const now = new Date();

        if (showAll) {
            filteredAtends = filteredAtends;
        } else if (showPast) {
            filteredAtends = filteredAtends.filter(atend => atend.data.toMillis() < now.getTime());
        } else if (showFuture) {
            filteredAtends = filteredAtends.filter(atend => atend.data.toMillis() >= now.getTime());
        }

        const patientFiltered = filteredAtends.filter(atend => atend.paciente.toLowerCase().includes(patientFilter.toLowerCase()));

        const dateFiltered = dateFilter
            ? patientFiltered.filter(
                (atend) =>
                    atend.data.toMillis() >= dateFilter.getTime() &&
                    atend.data.toMillis() < dateFilter.getTime() + 24 * 60 * 60 * 1000
            )
            : patientFiltered;

        let orderedAtends;
        switch (orderBy) {
            case 'date':
                orderedAtends = dateFiltered.sort((a, b) => {
                    const result = a.data.toMillis() - b.data.toMillis();
                    return orderDirection === 'asc' ? result : -result;
                });
                break;
            case 'local':
                orderedAtends = dateFiltered.sort((a, b) => {
                    const result = a.local.localeCompare(b.local);
                    return orderDirection === 'asc' ? result : -result;
                });
                break;
            default:
                orderedAtends = dateFiltered.sort((a, b) => {
                    const result = a.paciente.localeCompare(b.paciente);
                    return orderDirection === 'asc' ? result : -result;
                });
                break;
        }

        setAtendimentos(orderedAtends);

    };

    const handleDelete = async (atendimentoId) => {
        Swal.fire({
            title: "Deseja realmente excluir esse atendimento?",
            text: "Não será possível recuperá-lo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#32bb67",
            cancelButtonColor: "#d33",
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDoc(doc(db, 'atendimentos', atendimentoId));
                    fetchAtendimentos();
                } catch (error) {
                    console.error("Error deleting atendimento: ", error);
                }
            }
        });
    };

    useEffect(() => {
        fetchAtendimentos();
    }, [onAtendimentoCreated, orderBy, orderDirection, patientFilter, dateFilter, showAll, showPast, showFuture]);

    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        return { date: formattedDate, time: formattedTime };
    };

    const toggleOrderDirection = () => {
        setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 filters">
                <label htmlFor="patientFilter" className="mr-2">Filtrar por paciente:</label>
                <input
                    type="text"
                    id="patientFilter"
                    value={patientFilter}
                    onChange={(e) => setPatientFilter(e.target.value)}
                />

                <label htmlFor="dateFilter" className="ml-4 mr-2">Filtrar por data:</label>
                <input
                    type="date"
                    id="dateFilter"
                    value={dateFilter ? dateFilter.toISOString().split('T')[0] : ''}
                    onChange={(e) => setDateFilter(e.target.valueAsDate)}
                />

                <label className="ml-4">
                    <input
                        type="checkbox"
                        checked={showAll}
                        onChange={() => {
                            setShowAll(true);
                            setShowPast(false);
                            setShowFuture(false);
                        }}
                    /> Todos
                </label>

                <label className="ml-4">
                    <input
                        type="checkbox"
                        checked={showPast}
                        onChange={() => {
                            setShowAll(false);
                            setShowPast(!showPast);
                            setShowFuture(false);
                        }}
                    /> Concluídos
                </label>

                <label className="ml-4">
                    <input
                        type="checkbox"
                        checked={showFuture}
                        onChange={() => {
                            setShowAll(false);
                            setShowPast(false);
                            setShowFuture(!showFuture);
                        }}
                    /> Futuros
                </label>
            </div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-full border">
                    <thead>
                        <tr>
                            <th className="border-b">
                                <button onClick={() => setOrderBy('paciente')}>Paciente</button>
                                {orderBy === 'paciente' && <button onClick={toggleOrderDirection}>{orderDirection === 'asc' ? '↑' : '↓'}</button>}
                            </th>
                            <th className="border-b">
                                <button onClick={() => setOrderBy('date')}>Data</button>
                                {orderBy === 'date' && <button onClick={toggleOrderDirection}>{orderDirection === 'asc' ? '↑' : '↓'}</button>}
                            </th>
                            <th className="border-b">Hora</th>
                            <th className="border-b">
                                <button onClick={() => setOrderBy('local')}>Local</button>
                                {orderBy === 'local' && <button onClick={toggleOrderDirection}>{orderDirection === 'asc' ? '↑' : '↓'}</button>}
                            </th>
                            <th className="border-b"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAtendimentos.map((atendimento, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{atendimento.paciente}</td>
                                <td className="py-2 px-4 border-b">{formatDate(atendimento.data).date}</td>
                                <td className="py-2 px-4 border-b">{formatDate(atendimento.data).time}</td>
                                <td className="py-2 px-4 border-b">{atendimento.local}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleDelete(atendimento.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2"
                    >
                        <FaArrowLeft />
                    </button>
                    {Array.from({ length: Math.ceil(atendimentos.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(atendimentos.length / itemsPerPage)}
                        className="ml-2"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>

    );
}

export default ShowAtendimentos;