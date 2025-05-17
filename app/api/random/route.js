// src/app/api/random/route.js
import { NextResponse } from 'next/server';

export function GET() {
  const numberOne = Math.floor(Math.random() * 100);
  const numberTwo = Math.floor(Math.random() * 100);

  return NextResponse.json({
    numberOne,
    numberTwo,
    sum: numberOne + numberTwo,
  });
}
