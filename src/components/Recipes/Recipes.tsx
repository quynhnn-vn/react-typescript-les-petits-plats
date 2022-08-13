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

  const [formattedRecipes, setFormattedRecipes] = useState<FormattedRecipe[]>(
    []
  );

  const getTagOptions = (recipes: FormattedRecipe[]) => {
    let ingredientOptions: string[][] = [],
      applianceOptions: string[][] = [],
      ustensilOptions: string[][] = [];

    for (let i = 0; i < recipes.length; i++) {
      const recipe: FormattedRecipe = recipes[i];
      ingredientOptions[ingredientOptions.length] = recipe.flatIngredients;
      applianceOptions[applianceOptions.length] = recipe.appliance;
      ustensilOptions[ustensilOptions.length] = recipe.ustensils.flat();
    }

    setTagOptions({
      ingredients: removeDuplicate(ingredientOptions.flat()),
      appliances: removeDuplicate(applianceOptions.flat()),
      ustensils: removeDuplicate(ustensilOptions.flat()),
    });
  };

  useEffect(() => {
    if (recipes.length > 0) setFormattedRecipes(formatRecipes(recipes));
  }, []);

  useEffect(() => {
    let inputValues: string[] = [];
    const existedValues = Object.values(selectedTags).flat();
    for (let i = 0; i < existedValues.length; i++) {
      if (existedValues[i].length > 0)
        inputValues[inputValues.length] = String(
          existedValues[i]
        ).toLowerCase();
    }

    const term = String(searchTerm).trim().toLowerCase();

    let foundRecipes: FormattedRecipe[] = [];

    if (formattedRecipes.length > 0) {
      if (inputValues.length > 0 && term.length < 3) {
        for (let i = 0; i < formattedRecipes.length; i++) {
          const recipe = formattedRecipes[i];
          let isFound = Array(inputValues.length).fill(false);
          for (let j = 0; j < inputValues.length; j++) {
            const value = inputValues[j];
            if (
              recipe?.flatIngredients.includes(value) ||
              recipe?.appliance.includes(value) ||
              recipe?.ustensils.includes(value)
            ) {
              isFound[j] = true;
            }
          }
          if (!isFound.includes(false))
            foundRecipes[foundRecipes.length] = recipe;
        }
      } else if (inputValues.length === 0 && term.length >= 3) {
        for (let i = 0; i < formattedRecipes.length; i++) {
          const recipe = formattedRecipes[i];

          let isFoundIngredients = false;
          for (let j = 0; j < recipe.flatIngredients.length; j++) {
            if (recipe.flatIngredients[j].includes(term))
              isFoundIngredients = true;
          }

          if (
            recipe &&
            (String(recipe.name).toLowerCase().includes(term) ||
              String(recipe.description).toLowerCase().includes(term) ||
              isFoundIngredients)
          )
            foundRecipes[foundRecipes.length] = recipe;
        }
      } else if (inputValues.length > 0 && term.length >= 3) {
        for (let i = 0; i < formattedRecipes.length; i++) {
          const recipe = formattedRecipes[i];

          let isFound = Array(inputValues.length).fill(false);
          for (let j = 0; j < inputValues.length; j++) {
            const value = inputValues[j];
            if (
              recipe?.flatIngredients.includes(value) ||
              recipe?.appliance.includes(value) ||
              recipe?.ustensils.includes(value)
            ) {
              isFound[j] = true;
            }
          }

          let isFoundIngredients = false;
          for (let k = 0; k < recipe.flatIngredients.length; k++) {
            if (recipe.flatIngredients[k].includes(term))
              isFoundIngredients = true;
          }

          if (
            recipe &&
            !isFound.includes(false) &&
            (String(recipe.name).toLowerCase().includes(term) ||
              String(recipe.description).toLowerCase().includes(term) ||
              isFoundIngredients)
          )
            foundRecipes[foundRecipes.length] = recipe;
        }
      } else {
        foundRecipes = formattedRecipes;
      }
    }
    setFilteredRecipes(foundRecipes);
    getTagOptions(foundRecipes);
  }, [formattedRecipes, searchTerm, selectedTags]);

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
