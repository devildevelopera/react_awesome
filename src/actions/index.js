export const increment = nr => {
    return {
        type: 'INCREMENT',
        payload: nr
    };
};
export const decrement = () => {
    return {
        type: 'DECREMENT'
    };
};
export const onlineusers = ous => {
    return {
        type: 'ONLINEUSERS',
        payload: ous
    };
}