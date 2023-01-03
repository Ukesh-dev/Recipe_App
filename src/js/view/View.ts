import { initialrecipeState, state } from '../store/recipeStore';
import icons from 'url:../../img/icons.svg';
import { SearchRecipe } from '../../api/types';

export default class View {
  _data = state;

  _searchData: SearchRecipe[] = [];
  protected _parentElement: HTMLElement = document.getElementById(
    '#nepal'
  ) as HTMLElement;
  protected _errorMsg = '';
  protected _message = '';

  /**
   *
   * Render the received object to the DOM
   * @this {Object} View instance
   * @author Ukesh Shrestha
   * @copyright https://ukeshrestha.com.np
   */

  render(data: initialrecipeState) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // }
  }

  renderSearchDataWithPagination(data: SearchRecipe[]) {
    if (state.search.results.length === 0) return this.renderError();
    this._searchData = data;

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  protected _generateMarkup(): string {
    throw new Error('Method not implemented.');
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = (parentElement?: HTMLElement) => {
    const parentElements = parentElement || this._parentElement;
    const markup = `<div class="spinner ${parentElement && 'btn-spinner'}">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    parentElements.innerHTML = '';
    parentElements.insertAdjacentHTML('afterbegin', markup);
  };

  renderError = (error = this._errorMsg) => {
    const markup = `
         <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${error}</p>
          </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderMessage = (msg = this._message) => {
    const markup = `
         <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}
