import Link from 'next/link';
import '@/styles/globals.scss';

export default function MainMenu() {
  return (
    <div className="container">
      <h1>Menu Principal</h1>
      <ul>
        <li>
          <Link href="exercises">Exercicio numero 1</Link>{' '}
        </li>
      </ul>
    </div>
  );
}
