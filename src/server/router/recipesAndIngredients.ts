import { createRouter } from "./context";
import { z } from "zod";

export const recipesAndIngredientsRouter = createRouter()
  .query("recipes", {
    async resolve({ ctx }) {
      return {
        recipes: await ctx.prisma.recipe.findMany(),
      };
    },
  })
  .query("recipe", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.recipe.findUnique({ where: { id: input.id } });
    },
  })
  .query("ingredients", {
    async resolve({ ctx }) {
      return await ctx.prisma.ingredient.findMany();
    },
  })
  .mutation("create-ingredient", {
    input: z.object({ name: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.ingredient.create({ data: input });
    },
  })
  .mutation("create-recipe", {
    async resolve({ ctx }) {
      return await ctx.prisma.recipe.create({ data: {} });
    },
  })
  .mutation("add-ingredient-to-recipe", {
    input: z.object({
      ingredientId: z.string(),
      amount: z.string(),
      recipeId: z.string(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.ingredientAmount.create({
        data: input,
      });
    },
  })
  .mutation("update-recipe", {
    input: z.object({
      id: z.string(),
      image: z.string().optional(),
      instructions: z.string().optional(),
      name: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.recipe.update({ data: input, where: { id: input.id } });
    },
  });
