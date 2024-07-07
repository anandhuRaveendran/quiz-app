// app/layout.tsx
import { ReactNode } from 'react';
import '/home/anandu/INTERNSHIP/quiz-app/app/globals.css'
import Link from 'next/link';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>

        <main>{children}</main>
        
      </body>
    </html>
  );
}
