// components/ClientTable.jsx
'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/components/ClientTable.module.scss';

export default function ClientTable() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchClients() {
      console.log('estou entrando aqui');
      try {
        const res = await fetch('/api/get-clients');
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

  return (
    <div className={styles.container}>
      <h2>Lista de Clientes</h2>""
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
