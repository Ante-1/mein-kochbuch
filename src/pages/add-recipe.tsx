import type { NextPage } from "next";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

const AddRecipe: NextPage = () => {
  const ingredientsQuery = trpc.useQuery(["recipes.ingredients"]);

  return (
    <Layout>
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
        Neues Rezept anlegen
      </h1>
    </Layout>
  );
};

export default AddRecipe;
