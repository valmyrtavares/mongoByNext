// src/app/api/upload-json/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(req: NextRequest) {
  try {
    const jsonData = await req.json();

    // Caminho para a pasta public/data
    const dataDir = path.join(process.cwd(), 'public', 'data');

    // Cria a pasta se ela não existir
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Caminho completo para salvar o arquivo
    const filePath = path.join(dataDir, 'dados.json');

    // Salva o conteúdo do JSON em formato de string
    await writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8');

    return NextResponse.json({
      message: 'Arquivo JSON salvo com sucesso!',
      length: jsonData.length || 0,
      path: '/data/dados.json',
    });
  } catch (error) {
    console.error('Erro ao salvar JSON:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar o arquivo JSON' },
      { status: 500 }
    );
  }
}
