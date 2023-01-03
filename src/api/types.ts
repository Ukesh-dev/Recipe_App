export type RecipeType = { data: { recipe: Recipe } };

export type RecipeState = Partial<Recipe>;

export type Recipe = {
  publisher: string;
  ingredients: Ingredient[];
  source_url: string;
  image_url: string;
  title: string;
  servings: number;
  cooking_time: number;
  id: string;
  key: string;
  bookmarks: boolean;
};

export type Ingredient = {
  quantity: number | null;
  unit: string;
  description: string;
};

export type SearchRecipe = {
  publisher: string;
  image_url: string;
  title: string;
  id: string;
  key: string;
};

// export type SearchRecipe = Omit<
//   Recipe,
//   'ingredients' | 'source_url' | 'servings' | 'cooking_time'
// >;

export type UploadRecipe = Omit<
  Recipe,
  'ingredients' | 'id' | 'key' | 'bookmarks'
> & {
  ingredients: {
    quantity: number | null;
    unit: string;
    description: string;
  }[];
};
