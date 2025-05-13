import { MongoClient } from 'mongodb';

export async function POST(request) {
  const data = await request.json();

  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
  const db = client.db('next-db');
  const collection = db.collection('user-next');

  const result = await collection.insertOne(data);
  client.close();

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
