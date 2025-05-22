// app/api/get-clients/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// const uri = process.env.MONGODB_URI;
// if (!uri) {
//   throw new Error('MONGODB_URI is not defined in environment variables');
// }
const client = await clientPromise;
const dbName = 'next-db';

export async function GET() {
  console.log('Conectando ao MongoDB...');
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('user-next');
    const users = await collection.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}
