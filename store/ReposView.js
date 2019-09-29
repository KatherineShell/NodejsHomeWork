import View from './View.js';
import { setRepos, setRepoName, setFiles } from './actions.js';
import { getGitRepos, getGitTreeContent } from './middlewares.js';

export default class ReposView extends View {
    constructor(el, store) {
        super(el, store);

        getGitRepos(store.dispatch)(setRepos);
    }

    menuItemClick(name) {
        let { _state, dispatch } = this._store;

        if (_state.repoName === name) {
            return;
        }

        getGitTreeContent(dispatch)(setFiles, name);
        dispatch(setRepoName(name));
    }

    render(data) {
        let { isRepoLoader, repos } = data;

        this._el.innerHTML = '';

        if (isRepoLoader) {
            this._el.innerHTML = '<div class="MenuList-Item Text_size_sm"><div class="Loader Loader_state_s"></div></div>';
        }
        else if (repos.length === 0) {
            this._el.innerHTML = '<div class="MenuList-Item Text_size_sm">There is no any repos.</div>';
        }
        else {
            repos.forEach(element => {
                let { name } = element;

                let div = document.createElement('div');
                div.onclick = () => this.menuItemClick(name);
                div.classList = 'MenuList-Item Text_size_sm';
                div.innerText = name;
                this._el.appendChild(div);
            });
            this._unsubscribe();//отписка от обновления стора после 
                                //заполнения выпадпющего списка репозиториями
        }
    }

    destroy() {
        super.destroy();
    }
}