// import { NextResponse } from 'next/server';
// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// if (!uri) {
//   throw new Error('MONGODB_URI is not defined in environment variables');
// }

// const product = new MongoClient(uri);
// const dbName = 'next-db';

// export async function GET() {
//   try {
//     await product.connect();
//     const db = product.db(dbName);
//     const collection = db.collection('aleatoria');
//     const products = await collection.find({}).toArray();
//     return NextResponse.json(products);
//   } catch (error) {
//     console.error('Erro ao buscar produtos:', error);
//     return NextResponse.json(
//       { error: 'Erro ao buscar usuários' },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  return new Response('ok');
}
