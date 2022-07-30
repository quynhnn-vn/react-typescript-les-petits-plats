import { useEffect, useState } from "react";

import { recipes } from "../../assets/recipes";
import icon from "../../assets/icon.svg";

import { formatRecipes, removeDuplicate } from "../../common/utils";
import {
  FormattedRecipe,
  Option,
  CurrentInput,
  TagInput,
} from "../../types/types";

import "bootstrap/dist/css/bootstrap.min.css";
import Search from "../../UI/Search/Search";
import Tag from "../../UI/Tag/Tag";
import AutocompleteBar from "../../UI/AutocompleteBar/AutocompleteBar";
import RecipeList from "../../UI/RecipeList/RecipeList";

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filteredRecipes, setFilteredRecipes] = useState<FormattedRecipe[]>([]);
  const [options, setOptions] = useState<Option>();

  const [currentInput, setCurrentInput] = useState<CurrentInput>({
    ingredients: "",
    appliances: "",
    ustensils: "",
  });

  const [tagInput, setTagInput] = useState<TagInput>({
    ingredients: [],
    appliances: [],
    ustensils: [],
  });

  const formattedRecipes = formatRecipes(recipes);
  const depsFormattedRecipes = JSON.stringify(formattedRecipes);

  useEffect(() => {
    if (formattedRecipes.length > 0) {
      let ingredientOptions: string[][] = [],
        applianceOptions: string[][] = [],
        ustensilOptions: string[][] = [];

      formattedRecipes.forEach((recipe: FormattedRecipe) => {
        ingredientOptions.push(recipe.flatIngredients);
        applianceOptions.push(recipe.appliance);
        ustensilOptions.push(recipe.ustensils.flat());
      });

      setOptions({
        ingredients: removeDuplicate(ingredientOptions.flat()),
        appliances: removeDuplicate(applianceOptions.flat()),
        ustensils: removeDuplicate(ustensilOptions.flat()),
      });
      setFilteredRecipes(formattedRecipes);
    }
  }, [depsFormattedRecipes]);

  useEffect(() => {
    const inputValues = Object.values(tagInput)
      .flat()
      .filter((value) => value.length > 0)
      .map((v) => v.toLowerCase());

    if (inputValues.length > 0) {
      const foundRecipes = formattedRecipes.filter(
        (recipe: FormattedRecipe) => {
          return (
            inputValues.every((value) =>
              recipe?.flatIngredients.includes(value)
            ) ||
            inputValues.every((value) => recipe?.appliance.includes(value)) ||
            inputValues.every((value) => recipe?.ustensils.includes(value))
          );
        }
      );
      setFilteredRecipes(foundRecipes);
    } else {
      setFilteredRecipes(formattedRecipes);
    }
  }, [
    depsFormattedRecipes,
    tagInput.ingredients.length,
    tagInput.appliances.length,
    tagInput.ustensils.length,
  ]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.trim().length >= 3) {
      const foundRecipes = formattedRecipes.filter(
        (recipe: FormattedRecipe) => {
          return (
            recipe.name.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term) ||
            recipe.flatIngredients.find((ingredient) =>
              ingredient.includes(term)
            )
          );
        }
      );
      setFilteredRecipes(foundRecipes);
    } else {
      setFilteredRecipes(formattedRecipes);
    }
  }, [searchTerm, depsFormattedRecipes]);

  return (
    <>
      <header>
        <img src={icon} alt="Les petits plats" />
        <h1>Les petits plats</h1>
      </header>
      <main>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Tag tagInput={tagInput} setTagInput={setTagInput} />
        {options && (
          <AutocompleteBar
            options={options}
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            tagInput={tagInput}
            setTagInput={setTagInput}
          />
        )}
        <RecipeList filteredRecipes={filteredRecipes} />
      </main>
    </>
  );
}
