'use client';
import style from '../../styles/layouts/UserForm.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    ativo: false,
    price: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const dataComTimestamp = {
      ...form,
      dataCadastro: new Date().toISOString(),
    };

    const response = await fetch('/api/post/product/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataComTimestamp),
    });

    const result = await response.json();
    setForm({
      title: '',
      category: '',
      ativo: false,
      price: '',
    });

    router.push('/get/products');
    console.log('Resultado:', result);
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className=".form">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titulo"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoria"
          required
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Preço"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
          />
          Disponível
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
