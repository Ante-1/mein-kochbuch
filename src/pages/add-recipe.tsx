import type { NextPage } from "next";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

const AddRecipe: NextPage = () => {
  const ingredientsQuery = trpc.useQuery(["recipes.ingredients"]);
  const recipeMutation = trpc.useMutation(["recipes.add-recipe"]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    await recipeMutation.mutateAsync({
      instructions: formData.instructions as string,
      name: formData.name as string,
    });
  }

  return (
    <Layout>
      <h1 className="text-3xl md:text-5xl leading-normal font-bold my-4">
        Neues Rezept anlegen
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[50rem]">
        <div className="mb-2 w-full">
          <label className="block mb-2 text-sm font-medium w-full">
            Name
            <input
              name="name"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium">
            Anleitung
            <textarea
              name="instructions"
              className="h-96 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </label>
        </div>{" "}
        <button
          type="submit"
          className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Speichern
        </button>
      </form>
    </Layout>
  );
};

export default AddRecipe;
