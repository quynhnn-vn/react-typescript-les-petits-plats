import { Recipe, FormattedRecipe } from "../types/types";

export const removeDuplicate = (array: string[]): string[] => {
  return [...new Set(array.map((i: string) => i?.toLowerCase()))];
};

export const formatRecipes = (array: Recipe[]): FormattedRecipe[] => {
  if (array.length === 0) return [];
  return array.map((recipe) => ({
    ...recipe,
    ustensils: recipe.ustensils.map((u) => u.toLowerCase()),
    appliance: [recipe.appliance.toLowerCase()],
    flatIngredients: recipe.ingredients.flatMap((i) =>
      i.ingredient?.toLowerCase()
    ),
  }));
};
