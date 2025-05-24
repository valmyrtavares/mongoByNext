'use client';

import React from 'react';
import style from '@/styles/components/ImageGaleries.module.scss';
import Image from 'next/image';

type Imagenn = {
  _id: string;
  title: string;
  category: string;
  text: string;
  compose?: string;
  imagem: string;
};

interface ImageGaleries {
  initialClients: Imagenn[];
}

const ImageGalery = ({ initialClients }: ImageGaleries) => {
  React.useEffect(() => {
    console.log('OBJEOT ', initialClients);
  }, []);
  return (
    <div className={style.cardsContainer}>
      {Array.isArray(initialClients) &&
        initialClients.map((item) => (
          <div key={item._id} className={style.card}>
            <h2 className={style.cardTitle}>{item.title}</h2>
            <div className={style.cardImage}>
              <Image
                className="card-image"
                src={item.imagem}
                alt={item.title}
                width={300}
                height={500}
              />
            </div>
            {item.text && <p className="card-text">{item.category}</p>}
            {item.compose && (
              <p className="card-compose">Por: {item.compose}</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default ImageGalery;
