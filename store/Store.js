export default class Store {
    constructor(reduser) {
        this._reduser = reduser;
        this._state = undefined;
        this._listeners = [];
        this.dispatch = this.dispatch.bind(this);
        this.dispatch({ type: '@@init' });
    }

    getState() {
        return this._state;
    }

    subscribe(callback) {
        this._listeners.push(callback);

        return () => {
            const index = this._listeners.indexOf(callback);
            this._listeners.splice(index, 1);
        };
    }

    dispatch(action) {
        this._state = this._reduser(this._state, action);
        this._notifyListeners();
    }

    _notifyListeners() {
        this._listeners.forEach(listener => {
            listener(this._state);
        });
    }
}