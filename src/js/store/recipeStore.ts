/* eslint-disable no-useless-catch */
import { searchRecipe, showRecipe, uploadRecipe } from '../../api/recipeApi';
import {
  RecipeState,
  RecipeType,
  SearchRecipe,
  UploadRecipe,
} from '../../api/types';
import { TOTAL_PAGE_DATA } from '../../config/config';
import { withAsync } from '../../helpers/withAsync';

export type initialrecipeState = {
  recipe: RecipeState;
  search: {
    query: string;
    results: SearchRecipe[];
    page: number;
    resultsPerPage: number;
  };
  bookMarks: RecipeState[];
};

export const state: initialrecipeState = {
  recipe: { bookmarks: false },
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: TOTAL_PAGE_DATA,
  },
  bookMarks: [],
};

export const getRecipe = async (id: string) => {
  const { response: recipe } = await withAsync(async () => {
    return showRecipe(id).then(data => data.recipe);
  });
  const bookmark = state.bookMarks.some(b => b.id === id);
  state.recipe = { ...state.recipe, ...recipe, bookmarks: bookmark };
  return state.recipe;
};

export const loadSearchResults = async (query: string) => {
  const { response } = await withAsync(async () =>
    searchRecipe(query).then(res => res.recipes)
  );
  const sortedSearchResult = response?.sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  // .map(data => {
  //   return { ...data, ...(data.key && { key: data.key }) };
  // });
  state.search = { ...state.search, query, results: sortedSearchResult ?? [] };
};

export function getSearchPages(pageNo: number = state.search.page) {
  state.search.page = pageNo;
  const start = (pageNo - 1) * TOTAL_PAGE_DATA;
  const end = pageNo * TOTAL_PAGE_DATA;

  return state.search.results.slice(start, end);
}

export const updateServings = (newServings: number) => {
  //* Formula for updating
  // newQt = oldQt * newServings / oldServings
  state.recipe.ingredients?.forEach(ing => {
    ing.quantity && state.recipe.servings
      ? (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
      : ing;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = (recipe: RecipeState) => {
  state.bookMarks.unshift(recipe);
  if (state.recipe.id === recipe.id) {
    state.recipe.bookmarks = true;
  }
  persistBookmark();
};

export const deleteBookmark = (recipe: RecipeState) => {
  const delIndex = state.bookMarks.findIndex(r => r.id === recipe.id);

  state.bookMarks.splice(delIndex, 1);

  recipe.bookmarks = false;

  persistBookmark();
};

const persistBookmark = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};

const init = () => {
  const data = localStorage.getItem('bookmarks');
  if (data !== null) {
    state.bookMarks = JSON.parse(data);
  }
};

const createRecipeObject = (data: RecipeType | null) => {
  const { recipe } = data?.data || {};

  return { ...recipe, ...(recipe?.key && { key: recipe.key }) };
};

export const uploadData = async (data: Record<string, string>) => {
  try {
    const ingredients = Object.entries(data)
      .filter(([key, value]) => key.startsWith('ingredient') && value !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          throw new Error('Invalid Format');
        }
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe: UploadRecipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };
    const { response: resData } = await withAsync(() => uploadRecipe(recipe));
    const getUploadedData = resData && createRecipeObject(resData);
    state.recipe = getUploadedData ?? state.recipe;
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

init();
