//import { MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongo';

export async function POST(request) {
  const data = await request.json();

  const client = await clientPromise;
  const db = client.db('next-db');
  const collection = db.collection('user-next');

  const result = await collection.insertOne(data);
  // client.close();

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
