import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">NoteHub</Link>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/notes">Notes</Link>
      </nav>
    </header>
  );
}