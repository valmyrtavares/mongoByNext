// src/components/ExcelUploader.tsx
'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ExcelUploader() {
  const [data, setData] = useState<Record<string, unknown>[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json(sheet) as Record<string, unknown>[];
      setData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  const sendToApi = async () => {
    try {
      const response = await fetch('/api/upload-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Resposta da API:', result);
      alert(`Enviado! ${result.length} registros.`);
    } catch (error) {
      console.error('Erro ao enviar JSON:', error);
      alert('Erro ao enviar JSON');
    }
  };

  return (
    <div>
      <h2>Importar Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={sendToApi}>Enviar JSON para API</button>
    </div>
  );
}
