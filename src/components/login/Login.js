import React, { Component } from 'react';
import styled from 'styled-components';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import { login } from '../api/UserFunctions';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './login.css';
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions';
import { compose } from 'redux';
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import jwt_decode  from 'jwt-decode';
import axios from 'axios';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 10px;
  }
`;

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {},
            formIsValid: true,
            emailValid: true,
            passwordValid: true
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.createNotificationSuccess = this.createNotificationSuccess.bind(this);
        this.createNotificationWarning = this.createNotificationWarning.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value}, ()=>{
            if(!this.state.formIsValid) {
                this.handleValidation()
            }
        });
    }

    onSubmit(e){
        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        if (this.handleValidation()) {
            login(user).then(res => {
                if(res) {
                    this.props.history.push(`/sell`);
                    this.createNotificationSuccess();
                    this.getUser();
                    this.setState({
                        email: '',
                        password: ''
                    })
                } else {
                    this.createNotificationWarning();
                }
            })
        }
    }

    getUser = () => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        axios.get('http://localhost:3005/users/'+decoded._id).then(res => {
            if(res.data) {
                localStorage.setItem('photo', res.data.photo);
            }
        })
    }

    handleValidation(){
        let { email, password } = this.state;
        let formIsValid = true;
        let emailValid = true;
        let passwordValid = true;
        let errors = {};

            //Email
            if(!email){
                formIsValid = false;
                emailValid = false;
                errors["email"] = "Cannot be empty";
            }else{
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    emailValid = false;
                    errors["email"] = "Email is not valid";
                    }
            }

            //Password
            if(!password){
                formIsValid = false;
                passwordValid = false;
                errors["password"] = "Cannot be empty";
                }else{
                if(password.length < 8){
                    formIsValid = false;
                    passwordValid = false;
                    errors["password"] = "At least 8 characters";
                }        
            }

        this.setState({errors: errors, formIsValid: formIsValid, emailValid: emailValid, passwordValid: passwordValid});
        return formIsValid;
    }

    createNotificationSuccess() {
        store.addNotification({
            title: "Login Success !",
            message: "Now you can post your products",
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000
            }
          });
    }

    createNotificationWarning() {
        store.addNotification({
            title: "Login Failed !",
            message: "User does not exist",
            type: "warning",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000
            }
          });
    }

    handleSubmit  = ()  => {
        this.props.dispatch(increment(5));
    }

    render() {
        const {email, password, errors, formIsValid, emailValid, passwordValid} = this.state
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <div className="row">
                            <div className="col-md-6 mt-5 mt-5 mx-auto">
                                <div style={{textAlign: "center"}}>
                                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                                </div>
                                <TextField
                                    fullWidth
                                    error={!emailValid? true: false}
                                    helperText={!formIsValid? errors['email']: ''}
                                    label="Email Address"
                                    margin="dense"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    className="mt-3"
                                />
                                <TextField
                                    fullWidth
                                    error={!passwordValid? true: false}
                                    helperText={!formIsValid? errors['password']: ''}
                                    label="Confirm Password"
                                    margin="dense"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    className="mt-3"
                                    value={password}
                                    onChange={this.onChange}
                                />
                                <Button style={{width:'100%'}} className="mt-3" variant="success" onClick={this.onSubmit}>Log in</Button>
                                <div className="mt-3 row" style={{textAlign: 'center'}}>
                                    <Link to={`/forgotpass`} className="col-md-6 mb-2">
                                        Fogot your password?
                                    </Link>
                                    <Link to={`/register`} className="col-md-6">
                                        Create a new account?
                                    </Link>
                                </div>
                                {/* <button onClick={this.handleSubmit} className="btn btn-lg btn-success btn-block mt-4"> Increment</button> */}
                            </div>
                        </div>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      increment: () => dispatch(increment()),
      decrement: () => dispatch(decrement()),
      dispatch
    }
  }

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
  )(Login);