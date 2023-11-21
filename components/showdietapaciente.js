'use client'
import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import 'firebase/firestore';

function ShowDieta() {
    const [day, setDay] = useState('');

    let codPaciente;
    if (typeof window !== 'undefined') {
        codPaciente = localStorage.getItem('cod_user');
    }

    const dietaColletctionRef = collection(db, "dietas")

    const [dieta, setDieta] = useState({
        cod_nutri: "",
        cod_paciente: "",
        nome: "",
        dias: {
            segunda_feira: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
            terca_feira: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
            quarta_feira: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
            quinta_feira: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
            sexta_feira: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
            sabado: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
            domingo: {
                refeicoes: {
                    cafe: {
                        comidas: []
                    },
                    colacao: {
                        comidas: []
                    },
                    almoco: {
                        comidas: []
                    },
                    lanche: {
                        comidas: []
                    },
                    jantar: {
                        comidas: []
                    },
                    ceia: {
                        comidas: []
                    },
                    pre_treino: {
                        comidas: []
                    },
                    pos_treino: {
                        comidas: []
                    }
                }
            },
        }
    });

    const fetchDietaData = async () => {
        // buscar dieta no firebase
        const dietaColletctionRef = collection(db, "dietas");
        const data = await getDocs(dietaColletctionRef);
        const dietas = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const dieta_doc = dietas.find((dieta) => dieta.cod_paciente === codPaciente);

        if (dieta_doc) {
            setDieta(dieta_doc);
        } else {
            alert("Você ainda não possui uma dieta.")
            return;
        }
    };

    useEffect(() => {
        // Chama a função de busca quando o componente é montado
        fetchDietaData();
    }, []);

    const handleButtonClick = (clickedDay) => {
        setDay(clickedDay);
    };

    const calculateTotalCalories = () => {
        let totalCalories = 0;

        Object.keys(dieta.dias).forEach((dia) => {
            Object.keys(dieta.dias[dia].refeicoes).forEach((refeicao) => {
                const comidas = dieta.dias[dia].refeicoes[refeicao].comidas;

                comidas.forEach((comida) => {
                    totalCalories += parseFloat(comida.calorias);
                });
            });
        });

        return totalCalories.toFixed(1);
    };

    const renderComidas = (refeicao) => {
        return (
            <td>
                {dieta.dias[day]?.refeicoes[refeicao]?.comidas.map((comida, index) => (
                    <div key={index}>
                        <p><b>{comida.nome}</b> - {comida.quantidade} gramas ou ml - {comida.porcao} {comida.unidade} - {comida.calorias} calorias</p>
                        <br></br>
                    </div>
                ))}
            </td>
        );
    };

    return (
        <div className="container mx-auto">
            <div>
                <h1>{dietaColletctionRef.nome}</h1>
            </div>
            <div className="grid grid-cols-7 gap-4">
                <button
                    className={`square-button ${day === 'segunda_feira' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('segunda_feira')}>Segunda-feira</button>
                <button
                    className={`square-button ${day === 'terca_feira' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('terca_feira')}>Terça-feira</button>
                <button
                    className={`square-button ${day === 'quarta_feira' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('quarta_feira')}>Quarta-feira</button>
                <button
                    className={`square-button ${day === 'quinta_feira' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('quinta_feira')}>Quinta-feira</button>
                <button
                    className={`square-button ${day === 'sexta_feira' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('sexta_feira')}>Sexta-feira</button>
                <button
                    className={`square-button ${day === 'sabado' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('sabado')}>Sábado</button>
                <button
                    className={`square-button ${day === 'domingo' ? 'clicked' : ''}`}
                    onClick={() => handleButtonClick('domingo')}>Domingo</button>
            </div>
            {day && (
                <div className='tabela-dieta'>
                    <table className='mt-4'>
                        <thead>
                            <tr>
                                <th>Refeição</th>
                                <th>Lista de Comidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Café da manhã</td>
                                {renderComidas('cafe')}
                            </tr>
                            <tr>
                                <td>Colação</td>
                                {renderComidas('colacao')}
                            </tr>
                            <tr>
                                <td>Almoço</td>
                                {renderComidas('almoco')}
                            </tr>
                            <tr>
                                <td>Lanche da Tarde</td>
                                {renderComidas('lanche')}
                            </tr>
                            <tr>
                                <td>Jantar</td>
                                {renderComidas('jantar')}
                            </tr>
                            <tr>
                                <td>Ceia</td>
                                {renderComidas('ceia')}
                            </tr>
                            <tr>
                                <td>Pré-treino</td>
                                {renderComidas('pre_treino')}
                            </tr>
                            <tr>
                                <td>Pós-treino</td>
                                {renderComidas('pos_treino')}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
            <br></br>

            <div>
                <p><b>Calorias Totais:</b> {calculateTotalCalories()} kCal</p>
            </div>
        </div>
    );
}

export default ShowDieta;
