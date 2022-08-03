import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { trpc } from "../utils/trpc";

const Layout = ({ children }: { children: ReactNode }) => {
  const recipeMutation = trpc.useMutation(["recipes.add-recipe"]);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Mein Kochbuch</title>
        <meta name="description" content="Eine Rezept-Seite mit Zutatensuche" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen">
        <nav className="text-2xl w-full bg-gray-200 py-2 px-4">
          <span className="absolute text-3xl">
            Mein <span className="text-blue-500">Kochbuch</span>
          </span>
          <ul className="flex items-center justify-center gap-16">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/search">Rezept Suchen</Link>
            </li>
            <button
              onClick={openDialog}
              className="px-3 pb-1 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105"
            >
              Neues Rezept anlegen
            </button>
          </ul>
        </nav>
        <main className="container mx-auto flex flex-col items-center p-4 text-gray-700">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
