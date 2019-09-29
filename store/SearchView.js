import View from './View.js';
import { setFileName } from './actions.js';

export default class SearchView extends View {
    constructor(el, store) {
        super(el, store);

        this._el.addEventListener('input', this._onInput.bind(this));
    }

    _onInput(event) {
        this._store.dispatch(setFileName(event.target.value));
    }

    render(data) {
       this._el.value = data.fileName;
    }

    destroy() {
        super.destroy();
        this._el.removeEventListener('input', this._onInput);
    }
}