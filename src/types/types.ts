export type TagOptions = {
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

export type SearchTagTerm = {
  ingredients: string;
  appliances: string;
  ustensils: string;
};

export type SelectedTags = {
  ingredients: string[];
  appliances: string[];
  ustensils: string[];
};

export type ShowAll = {
  ingredients: boolean;
  appliances: boolean;
  ustensils: boolean;
};

export enum colors {
  blue = "var(--blue)",
  green = "var(--green)",
  red = "var(--red)",
}

export enum text {
  ingredient = "ingredient",
  appareil = "appareil",
  ustensil = "ustensil",
  ingredients = "ingredients",
  appareils = "appareils",
  ustensils = "ustensils",
  appliances = "appliances",
}
