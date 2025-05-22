import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// const uri = process.env.MONGODB_URI;
// if (!uri) {
//   throw new Error('MONGODB_URI is not defined in environment variables');
// }

const dbName = 'next-db';

export async function GET() {
  try {
    const product = await clientPromise;
    const db = product.db(dbName);
    const collection = db.collection('aleatoria');
    const products = await collection.find({}).toArray();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar usuários' },
      { status: 500 }
    );
  }
}
