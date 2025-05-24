import React from 'react';
import style from '../styles/components/sindeMenu.module.scss';
import Link from 'next/link';

const sideMenu = () => {
  return (
    <div className={style.container}>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <Link href="/get">Lista de Clientes</Link>
        </div>
        <div className={style.menuItem}>
          <Link href="/get/products">Lista de Produtos</Link>
        </div>
        <div className={style.menuItem}>
          <Link href="/get/tropical">Clientes Tropícal</Link>
        </div>
        <div className={style.menuItem}>
          <Link href="/get/images">Pinterest</Link>
        </div>
      </div>
    </div>
  );
};
export default sideMenu;
