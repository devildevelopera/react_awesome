import axios from 'axios';

export const register = newUser => {
    return axios
        .post('http://160.153.235.119:3005/users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            return res.data
        })
}

export const login = user =>{
    return axios
        .post('http://160.153.235.119:3005/users/login', {
            email: user.email,
            password: user.password,
        })
        .then(res => {
            if(res.data){
                localStorage.setItem('usertoken', res.data);
            }
            return res.data
        })
}

export const forgotpass = user =>{
    return axios
        .post('http://160.153.235.119:3005/users/forgotpass', {
            email: user.email
        })
        .then(res => {
            return res.data
        })
}

export const resetpass = user =>{
    return axios
        .patch('http://160.153.235.119:3005/users/resetpass/'+user.user_id, {
            password: user.password
        })
        .then(res => {
            return res.data
        })
}

export const updatepass = user =>{
    return axios
        .patch('http://160.153.235.119:3005/users/updatepass/'+user.user_id, {
            password: user.password
        })
        .then(res => {
            return res.data
        })
}

export const userUpdate = User => {
    return axios
        .patch('http://160.153.235.119:3005/users/userUpdate/'+User.user_id, {
            first_name: User.first_name,
            last_name: User.last_name,
            email: User.email,
            phone: User.phone,
            country: User.country,
            city: User.city
        })
        .then(res => {
            return res
        })
}