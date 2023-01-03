import View from './View';

class searchView extends View {
  _parentElement = document.querySelector('.search') as HTMLFormElement;
  private _inputField = document.querySelector(
    '.search__field'
  ) as HTMLInputElement;

  getInputValue() {
    const queryString = this._inputField.value;
    this._clearInput();
    return queryString;
  }
  _clearInput() {
    this._inputField.value = '';
  }

  addSearchHandler(handler: () => void): void {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
