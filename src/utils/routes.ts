export const routes: Record<string, AppRoute> = {
  home: {
    label: "home",
    url: "/",
  },
  createRecipe: {
    label: "Neues Rezept",
    url: "/create-recipe",
  },
  search: {
    label: "Suche",
    url: "/search",
  },
};

interface AppRoute {
  label: string;
  url: string;
}
