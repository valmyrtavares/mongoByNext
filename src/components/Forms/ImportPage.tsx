'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ImportPage() {
  const [collectionName, setCollectionName] = useState('');
  const [jsonData, setJsonData] = useState<Record<string, unknown>[]>([]);
  const [status, setStatus] = useState('');

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const rawJson = XLSX.utils.sheet_to_json(worksheet);
      const parsedJson = rawJson as Record<string, unknown>[];
      setJsonData(parsedJson);
      setStatus(`Arquivo lido com sucesso: ${file.name}`);
    };

    reader.readAsArrayBuffer(file);
  }

  async function handleSubmit() {
    if (!collectionName || jsonData.length === 0) {
      setStatus('Preencha o nome da coleção e envie um arquivo válido.');
      return;
    }

    setStatus('Enviando dados para o banco...');

    const response = await fetch('/api/post/excel-to-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collectionName,
        data: jsonData,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus(
        `✅ ${result.message}. ${result.inserted} registros inseridos.`
      );
      setCollectionName('');
      setJsonData([]);
    } else {
      setStatus(`❌ Erro: ${result.error}`);
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Importar Dados via Excel</h1>

      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      <input
        type="text"
        placeholder="Nome da coleção"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        style={{ display: 'block', margin: '1rem 0', width: '100%' }}
      />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
        Enviar para o MongoDB
      </button>

      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}
