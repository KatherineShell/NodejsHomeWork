import View from './View.js';

export default class RepoName extends View {
    constructor(el, store) {
        super(el, store);
    }
    render(data) {
       this._el.innerHTML = data.repoName;
    }

    destroy() {
        super.destroy();
    }
}