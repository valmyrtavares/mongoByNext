// app/actions/clientActions.ts
'use server';

import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function deleteClient(id: string) {
  const client = await clientPromise;
  await client
    .db('next-db')
    .collection('user-next')
    .deleteOne({
      _id: new ObjectId(id),
    });
}
