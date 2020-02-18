import counterReducer from './counter';
import onlineusersReducer from './onlineusers';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    onlineUsers: onlineusersReducer
})

export default allReducers;