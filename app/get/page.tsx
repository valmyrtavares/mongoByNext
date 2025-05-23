import clientPromise from '@/lib/mongodb';
import ClientTable from '@/components/ClientTable';
import { deleteClient } from '../actions/ClientsActions';
// import { ObjectId } from 'mongodb';

const dbName = 'next-db';

export default async function ClientsPage() {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection('user-next');

  const clients = await collection.find({}).toArray();

  // Como os dados vêm com _id como objeto, precisamos serializar o _id
  const serializedClients = clients.map((client) => ({
    _id: client._id.toString(), // importante para não quebrar o componente
    nome: client.nome,
    email: client.email,
    ativo: client.ativo,
  }));

  return (
    <main>
      <h1>Lista de Clientes</h1>
      <ClientTable
        initialClients={serializedClients}
        deleteClient={deleteClient}
      />
    </main>
  );
}
