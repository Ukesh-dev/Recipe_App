import View from './View';
import { Fraction } from 'fractional';
import icons from 'url:../../img/icons.svg';
import { Ingredient } from '../../api/types';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe') as HTMLElement;
  _butonElement = document.querySelector('.tiny-btn') as HTMLElement;

  _errorMsg = "Sorry! Couldn't find the result. Try Again";
  _message = 'Success!!!';

  addHandler(handler: EventListenerOrEventListenerObject) {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
  }
  addServingsHandler(handler: (_: number) => void) {
    this._parentElement.addEventListener('click', e => {
      if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
        const btn = e.target.closest('.btn--tiny') as HTMLButtonElement;
        if (!btn) return;
        if (btn.dataset.updateTo) {
          const updateTo = +btn.dataset.updateTo;
          if (updateTo < 1) return;
          this.renderSpinner(btn);
          setTimeout(() => {
            handler(updateTo);
          }, 1000);
        }
      }
    });
  }

  // deleteBookmarhandler(handler: () => void) {
  //   this._parentElement.addEventListener('click', e => {
  //     if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
  //       const btn = e.target.closest('.delete-btn') as HTMLElement;
  //       if (!btn) return;
  //       handler();
  //     }
  //   });
  // }

  addBookmarkhandler(handler: () => void) {
    this._parentElement.addEventListener('click', e => {
      if (e.target instanceof HTMLElement || e.target instanceof SVGElement) {
        const btn = e.target.closest('.btn--bookmark');
        if (!btn) return;
        handler();
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  _generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.recipe.image_url}" alt="${
      this._data.recipe.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.recipe.cooking_time
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.recipe.servings && this._data.recipe.servings - 1
            }">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to="${
              this._data.recipe.servings && this._data.recipe.servings + 1
            }">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>


        <div class="recipe__user-generated ${
          this._data.recipe.key ? '' : 'hidden'
        } ">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg>
            <use href="${icons}#icon-${
      this._data.recipe.bookmarks ? 'bookmark-fill' : 'bookmark'
    }"></use>
          </svg>

        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${
            this._data.recipe.ingredients &&
            this._data.recipe.ingredients
              .map(this._generateIngredientMarkup)
              .join('')
          }
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.recipe.source_url}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }
  _generateIngredientMarkup(ing: Ingredient) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }
}

export default new RecipeView();
