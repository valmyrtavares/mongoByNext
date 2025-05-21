// app/api/delete-client/route.ts

import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'next-db';

if (!uri) {
  throw new Error('MONGODB_URI não está definido nas variáveis de ambiente');
}

const client = new MongoClient(uri);

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'ID inválido ou ausente' },
        { status: 400 }
      );
    }

    // Verifica se é um ObjectId válido
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Formato de ID inválido' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('user-next');

    const objectId = new ObjectId(id); // Aceito se for string válida (não número!)
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Nenhum cliente encontrado com esse ID' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar cliente' },
      { status: 500 }
    );
  }
}
//lux
