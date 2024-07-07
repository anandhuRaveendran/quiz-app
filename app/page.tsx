// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <Link href="/Quiz">Start Quiz</Link>
    </div>
  );
}
