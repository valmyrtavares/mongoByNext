'use client';

// import { get } from 'http';
import { useState, useEffect } from 'react';
import styles from '../styles/components/ClientTable.module.scss';
import { Product } from '@/types/interfaces';

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/get/products');
        const data: Product[] = await res.json();

        console.log('product data', data);
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    console.log('id', id);
    try {
      const response = await fetch('/api/delete/products', {
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
            <th>Titulo</th>
            <th>Categoria</th>
            <th>Tem estoque</th>
            <th>Preço</th>
            <th>ID</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.ativo ? 'Sim' : 'Não'}</td>
                <td>{product.price}</td>
                <td>{product._id}</td>
                <td
                  onClick={() => {
                    deleteProduct(product._id);
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
