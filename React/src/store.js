import {createStore} from 'redux'
import rootReducer from './rootReducer';

const store = createStore(rootReducer);
console.log(store.getState())
export default store;