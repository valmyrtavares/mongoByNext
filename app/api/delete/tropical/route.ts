import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'next-db'; // ❗ Certifique-se que isso está correto

if (!uri) {
  throw new Error('MONGODB_URI não está definido nas variáveis de ambiente');
}

const client = new MongoClient(uri);

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'ID inválido ou ausente' },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('aleatoria');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json(
      { error: 'Erro interno ao deletar produto' },
      { status: 500 }
    );
  }
}
