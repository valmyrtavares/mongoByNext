// components/ClientTable.jsx
'use client';

import styles from '../styles/components/ClientTable.module.scss';
import React from 'react';
import * as XLSX from 'xlsx';

type Client = {
  _id: string;
  nome: string;
  email: string;
  ativo: boolean;
  dataCadastro?: string;
};

interface ClientTableProps {
  initialClients: Client[];
  deleteClient: (id: string) => void; // ou Promise<void>
}

export default function ClientTable({
  initialClients,
  deleteClient,
}: ClientTableProps) {
  const exportToExcel = () => {
    if (!initialClients.length) {
      alert('Nenhum cliente para exportar!');
      return;
    }

    try {
      const formattedData = initialClients.map(({ ...rest }) => ({
        ...rest,
        dataCadastro: rest.dataCadastro
          ? new Date(rest.dataCadastro).toLocaleDateString('pt-BR')
          : '',
      }));

      console.log('Dados formatados:', formattedData);

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
      XLSX.writeFile(workbook, 'clientes.xlsx');

      console.log('Arquivo Excel gerado com sucesso!');
      alert('Arquivo Excel foi baixado com sucesso!');
    } catch (err) {
      console.error('Erro ao exportar Excel:', err);
      alert('Erro ao gerar o arquivo Excel');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Lista de Clientes</h2>
      <button onClick={exportToExcel}>Baixar Excel</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ativo</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(initialClients) &&
            initialClients.map((client) => (
              <tr key={client._id}>
                <td>{client.nome}</td>
                <td>{client.email}</td>
                <td>{client.ativo ? 'Sim' : 'Não'}</td>
                <td>{client._id}</td>
                <td
                  onClick={() => {
                    deleteClient(client._id);
                  }}
                >
                  Excluir
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
