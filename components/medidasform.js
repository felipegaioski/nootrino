import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import 'firebase/firestore';

const AtualizarMedida = () => {
  const [newPeso, setNewPeso] = useState('');
  const [newAltura, setNewAltura] = useState('');
  const [newCod_medidas, setNewCod_medidas] = useState('');
  const [newCod_paciente, setNewCod_paciente] = useState('');
  const [newData, setNewData] = useState('');
  const [newMassa_gorda, setNewMassa_gorda] = useState('');
  const [newMassa_muscular, setNewMassa_muscular] = useState('');
  const [newImc, setNewImc] = useState(null);

  const measuresCollectionRef = collection(db, 'medidas');

  const calcularImc = () => {
    /*if (!newPeso || !newAltura) {
      alert('Por favor, informe o peso e a altura para calcular o IMC.');
      return;
    }
    */
    const peso = parseFloat(newPeso);
    const altura = parseFloat(newAltura);

    /*if (isNaN(peso) || isNaN(altura) || altura === 0) {
      alert('Peso e altura devem ser números válidos maiores que zero.');
      return;
    }
*/
    const imcValue1 = (peso / Math.pow(altura, 2));
    const imcValue = imcValue1 - imcValue1 / 14;
    setNewImc(imcValue.toFixed(4));
  };

  const salvarMedida = async () => {
    await addDoc(measuresCollectionRef, {
      altura: parseFloat(newAltura),
      cod_medidas: newCod_medidas,
      cod_paciente: newCod_paciente,
      data: newData,
      massa_gorda: newMassa_gorda,
      massa_muscular: newMassa_muscular,
      peso: Number(newPeso),
      imc: Number(newImc),
    });
  };

  const handlePesoChange = (event) => {
    setNewPeso(event.target.value);
    calcularImc();
  };

  const handleAlturaChange = (event) => {
    setNewAltura(event.target.value);
    calcularImc();
  };

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Peso (kg)</label>
        <input
          type="number"
          placeholder="Digite o peso do paciente"
          value={newPeso}
          onChange={handlePesoChange}
        />
      </div>

      <div className="form-group">
        <label>Altura (m)</label>
        <input
          type="number"
          placeholder="Digite a altura do paciente"
          value={newAltura}
          onChange={handleAlturaChange}
        />
      </div>

      <div className="form-group">
        <label>Percentual de Gordura (%)</label>
        <input
          type="number"
          placeholder="Digite o percentual de gordura do paciente."
          value={newMassa_gorda}
          onChange={(event) => setNewMassa_gorda(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Massa Muscular (%)</label>
        <input
          type="number"
          placeholder="Digite o percentual de massa muscular do paciente."
          value={newMassa_muscular}
          onChange={(event) => setNewMassa_muscular(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Data</label>
        <input
          type="timestamp"
          placeholder="Data da medição"
          value={newData}
          onChange={(event) => setNewData(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Código das Medidas</label>
        <input
          type="timestamp"
          placeholder="Código das medidas"
          value={newCod_medidas}
          onChange={(event) => setNewCod_medidas(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Código do Paciente</label>
        <input
          type="timestamp"
          placeholder="Código do paciente"
          value={newCod_paciente}
          onChange={(event) => setNewData(event.target.value)}
        />
      </div>

      <div className="form-group">
        <button onClick={salvarMedida}>Salvar Medidas Corporais</button>
      </div>

      {newImc !== null && (
        <div className="imc-result">
          <h4>IMC Calculado: {newImc}</h4>
        </div>
      )}
    </div>

  );
};

export default AtualizarMedida;