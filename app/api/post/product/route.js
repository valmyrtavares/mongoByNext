import clientPromise from '@/lib/mongo';

export async function POST(request) {
  const data = await request.json();

  const product = await clientPromise;
  const db = product.db('next-db');
  const collection = db.collection('product-next');

  const result = await collection.insertOne(data);
  //product.close();

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
