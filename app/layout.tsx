// app/layout.tsx
import { ReactNode } from 'react';
import '/home/anandu/INTERNSHIP/quiz-app/app/globals.css'
import Link from 'next/link';
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen sm:p-10 justify-center items-center bg-[#c8c7ff]">

        <main>{children}</main>
        
      </body>
    </html>
  );
}
