export default class View {
    constructor(el, store) {
        this._el = el;
        this._store = store;
        this._unsubscribe = store.subscribe(
            this._prepareRender.bind(this)
        );
        this._prepareRender(store.getState());
    }

    destroy() {
        this._el.innerHTML = '';
        this._unsubscribe();
    }
    _prepareRender(state) {
        this.render(state);
    }

    render() {
        throw new Error('This method should be overriden');
    }
}