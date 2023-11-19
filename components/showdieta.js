import React, { useState, useEffect } from 'react';
import {db} from '../firebase-config';
import { collection, addDoc, setDoc, doc, getDocs } from 'firebase/firestore';
import 'firebase/firestore';

const PlanoAlimentarPage = () => {
    const [newNome, setNewNome] = useState("");
    const [newQuantidade, setNewQuantidade] = useState(0);
    const [newUnidade, setNewUnidade] = useState("");
    const [newCalorias, setNewCalorias] = useState(0);

    const [dieta, setDieta] = useState([]);

    const dietaColletctionRef = collection(db, "dietas")

    const createDieta = async () => {
/*
    await setDoc(doc(dietaColletctionRef, "dieta1"), {
        id_nutri: "1",
        id_paciente: "1",
        nome: "hipertrofia"
    })
*/

    const dieta_doc = doc(dietaColletctionRef, "dieta2")

    await setDoc(dieta_doc, {
        dias: {
            segunda_feira: {
                refeicoes: {
                    almoco: {
                        comidas: [
                            {
                                nome: "maçã",
                                quantidade: "1",
                                unidade: "unidade",
                                calorias: "50"
                            },
                            {
                                nome: "bolo de laranja",
                                quantidade: "1",
                                unidade: "fatia",
                                calorias: "150"
                            }
                        ]
                    }
                }
            }
        }
    })

    }

    const getDieta = async () => {
        const querySnapshot = await getDocs(dietaColletctionRef);
        querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            setDieta(doc.data());
        });
    }

    useEffect(() => {
        getDieta();
    }, []);

    return(
        <div className='form-group'>

            {/* <button onClick={createDieta}> Criar Dieta </button> */}
        </div>
    )
}

export default PlanoAlimentarPage;