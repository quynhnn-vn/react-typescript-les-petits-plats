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

    recipes.forEach((recipe: FormattedRecipe) => {
      ingredientOptions.push(recipe.flatIngredients);
      applianceOptions.push(recipe.appliance);
      ustensilOptions.push(recipe.ustensils.flat());
    });

    setTagOptions({
      ingredients: removeDuplicate(ingredientOptions.flat()),
      appliances: removeDuplicate(applianceOptions.flat()),
      ustensils: removeDuplicate(ustensilOptions.flat()),
    });
  };

  useEffect(() => {
    setFormattedRecipes(formatRecipes(recipes));
  }, []);

  useEffect(() => {
    const inputValues = Object.values(selectedTags)
      .flat()
      .filter((value) => value.length > 0)
      .map((value) => value.toLowerCase());
    const term = searchTerm.trim().toLowerCase();

    let foundRecipes: FormattedRecipe[] = formattedRecipes;

    if (inputValues.length > 0 && term.length < 3) {
      foundRecipes = formattedRecipes.filter((recipe: FormattedRecipe) => {
        return inputValues.every(
          (value) =>
            recipe?.flatIngredients.includes(value) ||
            recipe?.appliance.includes(value) ||
            recipe?.ustensils.includes(value)
        );
      });
    } else if (inputValues.length === 0 && term.length >= 3) {
      foundRecipes = formattedRecipes.filter((recipe: FormattedRecipe) => {
        return (
          recipe.name.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term) ||
          recipe.flatIngredients.find((ingredient) => ingredient.includes(term))
        );
      });
    } else if (inputValues.length > 0 && term.length >= 3) {
      foundRecipes = formattedRecipes.filter((recipe: FormattedRecipe) => {
        return (
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
        );
      });
    } else {
      foundRecipes = formattedRecipes;
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
