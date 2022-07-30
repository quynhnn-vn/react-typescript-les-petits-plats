export type Option = {
  ingredients: string[];
  appliances: string[];
  ustensils: string[];
};

export type Ingredient = {
  ingredient: string;
  quantity?: string | number;
  unit?: string;
};

export type Recipe = {
  description: string;
  id: number;
  name: string;
  servings: number;
  time: number;
  ingredients: Ingredient[];
  appliance: string;
  ustensils: string[];
};

export type FormattedRecipe = Omit<Recipe, "appliance"> & {
  appliance: string[];
  flatIngredients: string[];
};

export type CurrentInput = {
  ingredients: string;
  appliances: string;
  ustensils: string;
};

export type TagInput = {
  ingredients: string[];
  appliances: string[];
  ustensils: string[];
};
