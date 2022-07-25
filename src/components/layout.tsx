import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { trpc } from "../utils/trpc";
import Dialog from "./dialog";

const Layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  const recipeMutation = trpc.useMutation(["recipes.add-recipe"]);
  const router = useRouter();

  function openDialog() {
    setOpen(true);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    const recipe = await recipeMutation.mutateAsync({
      name: formData.name as string,
    });
    setOpen(false);
    router.push("/add-recipe/" + recipe.id);
  }

  return (
    <>
      <Head>
        <title>Mein Kochbuch</title>
        <meta name="description" content="Eine Rezept-Seite mit Zutatensuche" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <main className="container mx-auto flex flex-col items-center h-screen p-4 text-gray-700">
        {children}
      </main>
      <Dialog isOpen={isOpen}>
        <h2 className="text-2xl mb-2">Neues Rezept</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="block mb-2 text-sm font-medium w-full">
            Name
            <input
              name="name"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>
          <button
            type="submit"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Rezept anlegen
          </button>
        </form>
      </Dialog>
    </>
  );
};

export default Layout;
