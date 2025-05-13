'use client';

import { useState, useEffect } from 'react';

type ExerciseData = {
  numberOne: number;
  numberTwo: number;
  sum: number;
};

const BuilderExercises = () => {
  const [data, setData] = useState<ExerciseData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const res = await fetch('/api/random');
        const json = await res.json();
        console.log('Response:', json);
        setData(json);
      } catch (err) {
        console.error('Erro ao buscar números:', err);
      }
    };

    fetchNumbers();
  }, []);

  const checkAnswer = () => {
    if (!data) return;
    setIsCorrect(Number(userAnswer) === data.sum);
  };

  if (!data) return <p>Carregando exercício...</p>;

  return (
    <div>
      <p>
        {data.numberOne} + {data.numberTwo}
      </p>
      <input
        type="number"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button onClick={checkAnswer}>Verificar</button>
      {isCorrect !== null && (
        <p>{isCorrect ? '✅ Correto!' : '❌ Errado! Tente de novo'}</p>
      )}
    </div>
  );
};

export default BuilderExercises;
