import axios from 'axios';

export const register = newUser => {
    return axios
        .post(`${process.env.REACT_APP_SERVER_API}/users/register`, {
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
        .post(`${process.env.REACT_APP_SERVER_API}/users/login`, {
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
        .post(`${process.env.REACT_APP_SERVER_API}/users/forgotpass`, {
            email: user.email
        })
        .then(res => {
            return res.data
        })
}

export const resetpass = user =>{
    return axios
        .patch(`${process.env.REACT_APP_SERVER_API}/users/resetpass/${user.user_id}`, {
            password: user.password
        })
        .then(res => {
            return res.data
        })
}

export const updatepass = user =>{
    return axios
        .patch(`${process.env.REACT_APP_SERVER_API}/users/updatepass/${user.user_id}`, {
            password: user.password
        })
        .then(res => {
            return res.data
        })
}

export const userUpdate = User => {
    return axios
        .patch(`${process.env.REACT_APP_SERVER_API}/users/userUpdate/${User.user_id}`, {
            first_name: User.first_name,
            last_name: User.last_name,
            email: User.email,
            phone: User.phone,
            country: User.country,
            city: User.city,
            pcode: User.pcode
        })
        .then(res => {
            return res
        })
}