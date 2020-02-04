import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import allReducers from './reducers'
// uncomment if you would like to serve the final site with service workers
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));
