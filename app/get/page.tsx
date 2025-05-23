// import ClientTable from '@/components/ClientTable';

// const Clients = () => {
//   return (
//     <div>
//       <ClientTable />
//     </div>
//   );
// };

// export default Clients;

// app/get/page.tsx
import ClientTable from '@/components/ClientTable';

export default async function ClientsPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get/clients`,
    {
      cache: 'no-store', // Garante que os dados não fiquem cacheados
    }
  );

  if (!res.ok) {
    throw new Error('Erro ao buscar clientes');
  }

  const clients = await res.json();

  return (
    <main>
      <h1>Lista de Clientes</h1>
      <ClientTable initialClients={clients} />
    </main>
  );
}
