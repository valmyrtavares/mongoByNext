// src/pages/api/upload-json.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const jsonData = req.body;

    console.log('Recebido JSON:', jsonData);

    // Aqui poderíamos salvar em um banco, arquivo ou qualquer outro lugar

    return res
      .status(200)
      .json({ message: 'JSON recebido com sucesso', length: jsonData.length });
  }

  return res.status(405).json({ message: 'Método não permitido' });
}
