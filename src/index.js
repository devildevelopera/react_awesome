import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import allReducers from './reducers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';
import jwt_decode  from 'jwt-decode';
import { onlineusers } from './actions';

// uncomment if you would like to serve the final site with service workers
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();
const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

const  socket = openSocket(`${process.env.REACT_APP_SERVER_API}`);

socket.on('server message', function(object) {
    store.dispatch(onlineusers(Object.values(object)));
});

setInterval(() => {
    if(localStorage.usertoken) {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        socket.emit('client message', decoded._id);
    }
  }, 1000);

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));
