import reducer from './reducer'
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';

const store = createStore(reducer, devToolsEnhancer());

export default store;


// export default createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({latency: 0}));