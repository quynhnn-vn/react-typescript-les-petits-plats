import { useEffect, useState } from "react";

import Search from "../../UI/Search/Search";
import Tag from "../../UI/Tag/Tag";
import AutocompleteBar from "../../UI/AutocompleteBar/AutocompleteBar";
import RecipeList from "../../UI/RecipeList/RecipeList";

import { recipes } from "../../assets/recipes";
import icon from "../../assets/icon.svg";

import { formatRecipes, removeDuplicate } from "../../common/utils";
import {
  FormattedRecipe,
  TagOptions,
  SearchTagTerm,
  SelectedTags,
} from "../../types/types";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Recipes() {
  const [filteredRecipes, setFilteredRecipes] = useState<FormattedRecipe[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [tagOptions, setTagOptions] = useState<TagOptions>();
  const [selectedTags, setSelectedTags] = useState<SelectedTags>({
    ingredients: [],
    appliances: [],
    ustensils: [],
  });
  const [searchTagTerm, setSearchTagTerm] = useState<SearchTagTerm>({
    ingredients: "",
    appliances: "",
    ustensils: "",
  });

  const formattedRecipes = formatRecipes(recipes);
  const dependencyRecipes = JSON.stringify(formattedRecipes);

  const getTagOptions = (recipes: FormattedRecipe[]) => {
    let ingredientOptions: string[][] = [],
      applianceOptions: string[][] = [],
      ustensilOptions: string[][] = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe: FormattedRecipe = recipes[i];
      ingredientOptions.push(recipe.flatIngredients);
      applianceOptions.push(recipe.appliance);
      ustensilOptions.push(recipe.ustensils.flat());
    }

    setTagOptions({
      ingredients: removeDuplicate(ingredientOptions.flat()),
      appliances: removeDuplicate(applianceOptions.flat()),
      ustensils: removeDuplicate(ustensilOptions.flat()),
    });
  };

  useEffect(() => {
    let inputValues: string[] = [];
    const existedValues = Object.values(selectedTags).flat();
    for (let i = 0; i < existedValues.length; i++) {
      if (existedValues[i].length > 0 && typeof existedValues[i] === "string")
        inputValues.push(existedValues[i].toLowerCase());
    }

    const term = searchTerm.trim().toLowerCase();

    let foundRecipes: FormattedRecipe[] = [];

    if (inputValues.length > 0 && term.length < 3) {
      for (let i = 0; i < formattedRecipes.length; i++) {
        const recipe = formattedRecipes[i];
        if (
          inputValues.every(
            (value) =>
              recipe?.flatIngredients.includes(value) ||
              recipe?.appliance.includes(value) ||
              recipe?.ustensils.includes(value)
          )
        )
          foundRecipes.push(recipe);
      }
    } else if (inputValues.length === 0 && term.length >= 3) {
      for (let i = 0; i < formattedRecipes.length; i++) {
        const recipe = formattedRecipes[i];
        if (
          recipe &&
          (recipe.name.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term) ||
            recipe.flatIngredients.find((ingredient) =>
              ingredient.includes(term)
            ))
        )
          foundRecipes.push(recipe);
      }
    } else if (inputValues.length > 0 && term.length >= 3) {
      for (let i = 0; i < formattedRecipes.length; i++) {
        const recipe = formattedRecipes[i];
        if (
          recipe &&
          inputValues.every(
            (value) =>
              recipe?.flatIngredients.includes(value) ||
              recipe?.appliance.includes(value) ||
              recipe?.ustensils.includes(value)
          ) &&
          (recipe.name.toLowerCase().includes(term) ||
            recipe.description.toLowerCase().includes(term) ||
            recipe.flatIngredients.find((ingredient) =>
              ingredient.includes(term)
            ))
        )
          foundRecipes.push(recipe);
      }
    } else {
      foundRecipes = formattedRecipes;
    }
    setFilteredRecipes(foundRecipes);
    getTagOptions(foundRecipes);
  }, [dependencyRecipes, searchTerm, selectedTags]);

  return (
    <>
      <header>
        <img src={icon} alt="Les petits plats" />
        <h1>Les petits plats</h1>
      </header>
      <main>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Tag selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        {tagOptions && (
          <AutocompleteBar
            tagOptions={tagOptions}
            searchTagTerm={searchTagTerm}
            setSearchTagTerm={setSearchTagTerm}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        )}
        <RecipeList
          filteredRecipes={filteredRecipes}
          searchTerm={searchTerm}
          selectedTags={selectedTags}
        />
      </main>
    </>
  );
}
