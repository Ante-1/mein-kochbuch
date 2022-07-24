import type { NextPage } from "next";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

const Search: NextPage = () => {
  const recipesQuery = trpc.useQuery(["recipes.recipes"]);

  return (
    <Layout>
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold">
        Rezept suchen
      </h1>
    </Layout>
  );
};

export default Search;
