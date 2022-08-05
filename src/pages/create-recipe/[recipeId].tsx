import type { NextPage } from "next";
import Layout from "../../components/layout";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const AddRecipe: NextPage = () => {
  const router = useRouter();
  const { recipeId } = router.query;
  const ingredientsQuery = trpc.useQuery(["recipes.ingredients"]);
  const recipeMutation = trpc.useMutation(["recipes.update-recipe"]);
  const recipeQuery = trpc.useQuery([
    "recipes.recipe",
    { id: recipeId as string },
  ]);
  const [value, setValue] = useState<any | null>(null);

  async function handleSubmit(event: any) {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form.entries());
    await recipeMutation.mutateAsync({
      id: recipeId as string,
      instructions: formData.instructions as string,
      name: formData.name as string,
    });
    router.push("/");
  }

  if (!recipeQuery.data) {
    return <>Loading...</>;
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
        <h2 className="text-2xl">Zutaten</h2>
        <div className="mb-2 w-full flex gap-4">
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === "string") {
                setValue({
                  title: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  title: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              // const filtered = filter(options, params);
              console.log("options", options, "params", params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              // const isExisting = options.some((option) => inputValue === option.title);
              // if (inputValue !== '' && !isExisting) {
              //   filtered.push({
              //     inputValue,
              //     title: `Add "${inputValue}"`,
              //   });
              // }

              return options;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="new-ingredient"
            options={[]}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === "string") {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label="Free solo with text demo" />
            )}
          />
          <label className="block mb-2 text-sm font-medium w-full">
            Menge
            <input
              name="amount"
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
