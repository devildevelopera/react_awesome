import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import allReducers from './reducers'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';

// uncomment if you would like to serve the final site with service workers
// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();

const  socket = openSocket('http://localhost:3005');

socket.on('timer', timestamp => console.log(timestamp));
socket.emit('subscribeToTimer', 1000);
socket.on('server message', function(message) {
    var people = JSON.parse(message);
    console.log(people);
});

const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
document.getElementById('root'));
