import View from './View';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list') as HTMLElement;

  _errorMsg = 'No bookmarks yet!!! Find a nice recipe and bookmark it.';
  _message = 'Success!!!';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return this._data.bookMarks
      .map(results => {
        return `<li class="preview">
            <a class="preview__link ${
              results.id === id ? 'preview__link--active' : ''
            }" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
                <div class="preview__user-generated ${
                  results.key ? '' : 'hidden'
                } ">
                <svg>
                <use href="${icons}#icon-user"></use>
                  </svg>
                </div>

              </div>
            </a>
          </li>
    `;
      })
      .join('');
  }
}

export default new BookmarksView();
