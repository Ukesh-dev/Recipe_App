import { KEY } from '../config/config';
import api from './api';
import { RecipeType, SearchRecipe, UploadRecipe } from './types';

export type SearchRecipeType = { data: { recipes: SearchRecipe[] } };

export const showRecipe = async (id: string) => {
  return api.get<RecipeType>(`${id}?key=${KEY}`).then(res => res.data.data);
};

export const searchRecipe = async (query: string) => {
  return api
    .get<SearchRecipeType>(`?search=${query}&key=${KEY}`)
    .then(res => res.data.data);
};

//! Deleting isn UNAUTHORIZED in this api so there's that
// export const deleteRecipe = async (id: string) => {
//   return api.delete<RecipeType>(`${id}`).then(res => res.data.data);
// };

export const uploadRecipe = async (recipe: UploadRecipe) => {
  return api.post<RecipeType>(`?key=${KEY}`, recipe).then(res => res.data);
};
