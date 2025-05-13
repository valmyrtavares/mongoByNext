// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI; // ex: mongodb://localhost:27017/restaurante

// if (!MONGODB_URI) {
//   throw new Error('Defina a MONGODB_URI no .env.local');
// }
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// export async function connectToDatabase() {
//   console.log('Estou aqui na lib/mongo.js');
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }
