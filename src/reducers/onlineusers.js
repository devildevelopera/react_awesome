const onlineusersReducer = (state = [], action ) => {
    switch(action.type) {
        case "ONLINEUSERS":
            return state = action.payload;
        default:
            return state;
    }
};

export default onlineusersReducer;