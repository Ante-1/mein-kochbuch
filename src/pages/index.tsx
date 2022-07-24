import type { NextPage } from "next";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";

type RecipeCardProps = {
  name: string;
  description: string;
};

const Home: NextPage = () => {
  const recipesQuery = trpc.useQuery(["recipes.recipes"]);

  return (
    <Layout>
      <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
        Mein Kochbuch
      </h1>
      <p className="text-2xl text-gray-700">Neueste Rezepte</p>
      <div className="grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
        {recipesQuery.data ? (
          <p>
            {recipesQuery.data.recipes.map((r) => (
              <RecipeCard
                key={r.id}
                name={r.name}
                description={
                  r.instructions
                    ? r.instructions.length > 99
                      ? r.instructions.substring(0, 100) + "..."
                      : r.instructions
                    : ""
                }
              />
            ))}
          </p>
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full"></div>
    </Layout>
  );
};

const RecipeCard = ({ name, description }: RecipeCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </section>
  );
};

export default Home;
