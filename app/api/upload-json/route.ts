// src/app/api/upload-json/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const jsonData = await req.json();

    console.log('JSON recebido:', jsonData);

    return NextResponse.json({
      message: 'JSON recebido com sucesso!',
      length: jsonData.length || 0,
    });
  } catch (error) {
    console.error('Erro ao processar JSON:', error);
    return NextResponse.json(
      { message: 'Erro ao processar JSON' },
      { status: 500 }
    );
  }
}
