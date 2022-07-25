# mein-kochbuch

Mein-Kochbuch wird eine App, in der man Rezepte anlegen und suchen kann. Besonders wichtig ist mir eine Suche mit Zutaten als Eingabe anstatt Rezeptnamen.

## Tech decisions

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.
Which uses next-js, tailwind, trpc and next-auth packages.

## Next steps (reminder)

- Build a form to create recipes
- Build a list that shows all recipes (most recent?)
- Build detail page for recipes
- Build a seach page
- styling
- think about how to create a form and how to update
- so that you can create and add ingeredients to a recipe
- when to save ingredients (save button?)

## start developing

- get local db dev brach proxy `pscale connect mein-kochbuch dev --port 3309`
- `npm run dev`

## salved problems

- HMR doesn't work in WSL2 in Windows file system and performance is generally terrible. Move to project ~ to fix
