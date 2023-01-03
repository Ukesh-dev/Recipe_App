import View from './View';
import icons from '../../img/icons.svg';

type HandlerFunction = (any: number) => void;

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination') as HTMLElement;

  addHandler(handler: HandlerFunction) {
    this._parentElement.addEventListener('click', e => {
      if (e.target instanceof HTMLElement) {
        const btnElem = e.target.closest('.btn--inline') as HTMLButtonElement;
        if (!btnElem) return;
        if (btnElem.dataset.goto) {
          const goToPage = +btnElem.dataset.goto;
          handler(goToPage);
        }
      }
    });
  }

  _generateMarkup() {
    const currPage = this._data.search.page;
    const numOfPage = Math.ceil(
      this._data.search.results.length / this._data.search.resultsPerPage
    );

    // const allPages = Array.from({ length: numOfPage }, (_, i) => i + 1);
    //* Code to render all the pages
    // const allPages = Array.from({ length: numOfPage })
    //   .map((_, i) => i + 1)
    //   .map(
    //     page => `
    //       <button data-goto="${page}" class="btn--inline pagination__btn--prev">
    //         <span>Page ${page}</span>
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-right"></use>
    //         </svg>
    //       </button>
    // `
    //   )
    //   .join('');

    //* Code to render only the pages we need.
    if (currPage === 1 && numOfPage > 1) {
      return `
              <button data-goto="${
                currPage + 1
              }" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>
    `;
    }
    if (currPage === numOfPage && numOfPage > 1) {
      return `
             <button data-goto="${
               currPage - 1
             }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
              </button>
    `;
    }
    if (currPage < numOfPage) {
      return `
             <button data-goto="${
               currPage - 1
             }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage - 1}</span>
              </button>

              <button data-goto="${
                currPage + 1
              }" class="btn--inline pagination__btn--next">
                <span>Page ${currPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>
    `;
    }
    return '';
    // return allPages;
  }
}
export default new PaginationView();
