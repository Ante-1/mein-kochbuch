import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Mein Kochbuch</title>
        <meta name="description" content="Eine Rezept-Seite mit Zutatensuche" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center h-screen p-4 text-gray-700">
        <nav className="text-2xl">
          <ul className="flex gap-16">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/search">Rezept Suchen</Link>
            </li>
            <li>
              <Link href="/add-recipe">Neues Rezept anlegen</Link>
            </li>
          </ul>
        </nav>
        {children}
      </main>
    </>
  );
};

export default Layout;
