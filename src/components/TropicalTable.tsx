'use client';

// import { get } from 'http';
import { useState, useEffect } from 'react';
import styles from '../styles/components/ClientTable.module.scss';
import { Tropical } from '@/types/interfaces';

const ProductTable = () => {
  const [customer, setCustomer] = useState<Tropical[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get/tropical');
        const data: Tropical[] = await res.json();

        console.log('product data', data);
        setCustomer(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    console.log('id', id);
    try {
      const response = await fetch('/api/delete/tropical', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Erro ao excluir o produto', data);
      }
      console.log('Produto deletado com sucesso:', data);
      return data;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cpf</th>
            <th>Aniversario</th>
            <th>Celular</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customer) &&
            customer.map((item) => (
              <tr key={item._id}>
                <td>{item.Nome}</td>
                <td>{item.CPF}</td>
                <td>{item.Aniverário}</td>
                <td>{item.Celular}</td>

                <td
                  onClick={() => {
                    deleteProduct(item._id);
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
};
export default ProductTable;
