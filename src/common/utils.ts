import { Recipe, FormattedRecipe } from "../types/types";

export const removeDuplicate = (array: string[]): string[] => {
  let uniqueArray = [] as any;
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (uniqueArray.indexOf(item) === -1) {
      uniqueArray.push(item);
    }
  }
  return uniqueArray;
};

export const formatRecipes = (array: Recipe[]): FormattedRecipe[] => {
  if (array.length === 0) return [];

  let newArray: FormattedRecipe[] = [];

  for (let i = 0; i < array.length; i++) {
    let recipe = array[i] as any;

    let flatIngredients = [],
      newUstensils: string[] = [],
      newAppliance: string[] = [];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      let ingredient = recipe.ingredients[j];
      flatIngredients.push(ingredient.ingredient.toLowerCase());
    }

    for (let k = 0; k < recipe.ustensils.length; k++) {
      let ustensil = recipe.ustensils[k];
      newUstensils.push(ustensil.toLowerCase());
    }

    if (recipe.appliance)
      newAppliance = [String(recipe.appliance).toLowerCase()];

    recipe.flatIngredients = flatIngredients;
    recipe.ustensils = newUstensils;
    recipe.appliance = newAppliance;

    newArray.push(recipe);
  }

  return newArray;
};
