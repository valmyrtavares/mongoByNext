import Link from 'next/link';
import style from '../styles/components/MenuHeader.module.scss';

const MenuHeader = () => {
  return (
    <div className="container">
      <div className={style.menuHeader}>
        <ul>
          <li>
            {' '}
            <Link href="/">Home</Link>
          </li>
          <li>
            {' '}
            <Link href="/forms/user-form">Cadatro de Clientes</Link>
          </li>
          <li>
            {' '}
            <Link href="/forms/product-form">Cadastro de Produtos</Link>
          </li>
          <li>
            <Link href="/get/clients">Lista de Clientes</Link>
          </li>
          <li>
            <Link href="/get/products">Lista de Produtos</Link>
          </li>
          <li>
            <Link href="/import">Excel</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MenuHeader;
