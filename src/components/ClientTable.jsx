// components/ClientTable.jsx
'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/components/ClientTable.module.scss';
import * as XLSX from 'xlsx';

export default function ClientTable() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      console.log('estou entrando aqui');
      try {
        const res = await fetch('/api/get/clients');
        const data = await res.json();
        console.log('data', data);
        setClients(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error); // adicione isso
        return NextResponse.json(
          { error: 'Erro ao buscar usuários' },
          { status: 500 }
        );
      }
    }

    fetchClients();
  }, []);

  const exportToExcel = () => {
    if (!clients.length) {
      alert('Nenhum cliente para exportar!');
      return;
    }

    try {
      const formattedData = clients.map(({ _id, ...rest }) => ({
        ...rest,
        dataCadastro: new Date(rest.dataCadastro).toLocaleDateString('pt-BR'),
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

  // async function deleteClient(id) {
  //   try {
  //     const response = await fetch('/api/delete/client', {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.error || 'Erro ao deletar item');
  //     }

  //     console.log('Item deletado com sucesso:', data);
  //     return data;
  //   } catch (error) {
  //     console.error('Erro na requisição DELETE:', error);
  //     throw error;
  //   }
  // }

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
          {Array.isArray(clients) &&
            clients.map((client) => (
              <tr key={client._id}>
                <td>{client.nome}</td>
                <td>{client.email}</td>
                <td>{client.ativo ? 'Sim' : 'Não'}</td>
                <td>{client._id}</td>
                {/* <td
                  onClick={() => {
                    deleteClient(client._id);
                  }}
                >
                  Excluir
                </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
