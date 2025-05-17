'use client';
import style from '../../styles/layouts/UserForm.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    ativo: false,
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

    const response = await fetch('/api/post/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataComTimestamp),
    });

    const result = await response.json();
    setForm({
      nome: '',
      email: '',
      ativo: false,
    });

    router.push('/get-clients');
    console.log('Resultado:', result);
  }

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className=".form">
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
          />
          Ativo
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
