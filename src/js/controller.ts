/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
// import icons from 'url:../img/icons.svg';
import {
  addBookmark,
  deleteBookmark,
  getRecipe,
  getSearchPages,
  loadSearchResults,
  state,
  updateServings,
  uploadData,
} from './store/recipeStore';
import recipeView from './view/recipeView';
import resultsView from './view/resultsView';
import searchView from './view/searchView';
import paginationView from './view/paginationView';
import bookMarksView from './view/bookMarksView';
import addRecipeView from './view/addRecipeView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// // @ts-ignore
// if (module.hot) {
//   //@ts-ignore
//   module.hot.accept();
// }

export const renderData = async () => {
  try {
    const id = window.location.hash.slice(1);
    previewBookmarks();
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.render(state);
    await getRecipe(id);
    recipeView.render(state);
  } catch (err) {
    recipeView.renderError();
  }
};

const renderSearchData = async () => {
  try {
    resultsView.renderSpinner();
    state.search.page = 1;
    paginationView._clear();
    const queryString = searchView.getInputValue();
    if (!queryString) {
      resultsView.renderError();
    }
    if (!queryString) return;
    await loadSearchResults(queryString);

    previewBookmarks();
    resultsView.renderSearchDataWithPagination(getSearchPages());
    paginationView.render(state);
  } catch (err) {
    resultsView.renderError();
  }
};

const renderPagination = (goToPage: number) => {
  if (state.search.page === goToPage) return;
  resultsView.renderSearchDataWithPagination(getSearchPages(goToPage));
  paginationView.render(state);
};

const renderServings = (newServings: number) => {
  updateServings(newServings);
  recipeView.render(state);
};

const renderBookmarks = () => {
  if (state.recipe.bookmarks === true) {
    deleteBookmark(state.recipe);
  } else {
    addBookmark(state.recipe);
  }
  recipeView.render(state);
  previewBookmarks();
};

const renderUploads = async (data: Record<string, string>) => {
  try {
    addRecipeView.renderSpinner();
    await uploadData(data);
    const renderToggleWindow = (): Promise<unknown> =>
      new Promise((resolve, _) => {
        addRecipeView.renderMessage('Well Done!!!');
        setTimeout(() => {
          resolve('resolved');
        }, 2000);
      });
    await renderToggleWindow().then(() => addRecipeView.render(state));

    recipeView.render(state);
    bookMarksView.render(state);
    window.history.pushState(null, '', `#${state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err as string);
    setTimeout(() => {
      addRecipeView.render(state);
    }, 2000);
  }
};

function previewBookmarks() {
  if (state.bookMarks.length === 0) {
    bookMarksView.renderError();
  } else {
    bookMarksView.render(state);
  }
}

const init = () => {
  recipeView.addHandler(renderData);
  recipeView.addServingsHandler(renderServings);
  recipeView.addBookmarkhandler(renderBookmarks);
  searchView.addSearchHandler(renderSearchData);
  paginationView.addHandler(renderPagination);
  addRecipeView.uploadHandler(renderUploads);
};
init();


///////////////////////////////////////
