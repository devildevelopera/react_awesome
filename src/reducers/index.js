import counterReducer from './counter';
import loggedReducer from './isLogged';
import onlineusersReducer from './onlineusers';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    onlineUsers: onlineusersReducer
})

export default allReducers;