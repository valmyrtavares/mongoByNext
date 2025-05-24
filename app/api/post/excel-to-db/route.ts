import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { collectionName, data } = body;

    if (!collectionName || !Array.isArray(data)) {
      return new Response(
        JSON.stringify({ error: 'collectionName ou data inválidos' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const client = await await clientPromise;
    const db = client.db('next-db');
    const collection = db.collection(collectionName);

    // Limpa a coleção antes de inserir os novos dados
    await collection.deleteMany({});

    // Insere todos os documentos do JSON
    const result = await collection.insertMany(data);

    client.close();

    return new Response(
      JSON.stringify({
        message: 'Dados inseridos com sucesso',
        inserted: result.insertedCount,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Erro ao salvar no MongoDB:', error);
    return new Response(JSON.stringify({ error: 'Erro ao salvar os dados' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
