import { createStore } from 'redux';
import { reducer } from './reducers/reducer';
//import { StoreType } from './reducers/reducer';
//import { ActionCallback } from './actions';

//type Reduce = (state: StoreType, action: ActionCallback)=>StoreType;

export const store = createStore(reducer /*:Reducer<StoreType, ActionCallback>*/);