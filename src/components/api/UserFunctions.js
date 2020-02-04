import axios from 'axios';

export const register = newUser => {
    return axios
        .post('http://localhost:3005/users/register', {
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
        .post('http://localhost:3005/users/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            if(res.data){
                localStorage.setItem('usertoken', res.data)
            }
            return res.data
        })
}