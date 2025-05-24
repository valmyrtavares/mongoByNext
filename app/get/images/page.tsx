import clientPromise from '@/lib/mongodb';
import ImagesGalary from '@/components/imageGalery';

const dbName = 'next-db';

export default async function ImagesPage() {
  const image = await clientPromise;
  const db = image.db(dbName);
  const collection = db.collection('images');

  const images = await collection.find({}).toArray();

  const serializedClients = images.map((item) => ({
    _id: item._id.toString(), // importante para não quebrar o componente
    title: item.title,
    imagem: item.imagem,
    category: item.category,
    compose: item.compose,
    text: item.text,
  }));
  console.log('TESTANDO ', images);

  return (
    <main>
      <ImagesGalary initialClients={serializedClients} />
    </main>
  );
}
