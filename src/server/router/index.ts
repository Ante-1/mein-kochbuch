// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { recipesAndIngredientsRouter } from "./recipesAndIngredients";
import { authRouter } from "./auth";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", recipesAndIngredientsRouter)
// .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
