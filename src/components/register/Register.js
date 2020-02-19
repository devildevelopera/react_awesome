import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import { register } from '../api/UserFunctions';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './register.css';
import { Checkbox } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 10px;
  }
`;

class Register extends Component {
    constructor(){
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            cpassword: '',
            errors: {},
            formIsValid: true,
            firstNameValid: true,
            lastNameValid: true,
            emailValid: true,
            passwordValid: true,
            cpasswordValid: true,
            term: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.createNotificationSuccess = this.createNotificationSuccess.bind(this);
        this.createNotificationExist = this.createNotificationExist.bind(this);
        this.createNotificationFail = this.createNotificationFail.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value}, ()=>{
            if(!this.state.formIsValid) {
                this.handleValidation();
            }
        });     
    }

    onSubmit(e){
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
        if (this.handleValidation() && this.state.term) {
            register(user).then(res => {
                if(res === "success") {
                    this.props.history.push(`/login`);
                    this.createNotificationSuccess();
                    this.setState({
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: ''
                    })
                } else if(res === "exist") {
                    this.createNotificationExist();
                    this.setState({
                        email: '',
                    })
                } else {
                    this.createNotificationFail();
                }
            })
        }
    }

    handleValidation(){
            let { first_name, last_name, email, password, cpassword } = this.state;
            let formIsValid = true
            let errors = {};
            let firstNameValid = true;
            let lastNameValid = true;
            let emailValid = true;
            let passwordValid = true;
            let cpasswordValid = true;

            //FIrst Name
            if(!first_name){
                formIsValid = false;
                firstNameValid = false;
                errors["first_name"] = "Cannot be empty";
             }else{
                if(!first_name.match(/^[a-zA-Z]+$/)){
                   formIsValid = false;
                   firstNameValid = false;
                   errors["first_name"] = "Only letters";
                }        
             }

            //Last Name
            if(!last_name){
                formIsValid = false;
                lastNameValid = false;
                errors["last_name"] = "Cannot be empty";
             }else{
                if(!last_name.match(/^[a-zA-Z]+$/)){
                   formIsValid = false;
                   lastNameValid = false;
                   errors["last_name"] = "Only letters";
                }        
             }

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

            //Confirm password
            if(!cpassword){
                formIsValid = false;
                cpasswordValid = false;
                errors["cpassword"] = "Cannot be empty";
                }else if(cpassword.length < 8){
                    formIsValid = false;
                    cpasswordValid = false;
                    errors["cpassword"] = "At least 8 characters";
                }else{
                if(password !== cpassword) {
                    formIsValid = false;
                    cpasswordValid = false;
                    errors["cpassword"] = "Password not match";
                }
            }

        this.setState({errors: errors, formIsValid: formIsValid, firstNameValid: firstNameValid, lastNameValid: lastNameValid, emailValid: emailValid, passwordValid: passwordValid, cpasswordValid: cpasswordValid});
        return formIsValid;
    }

    createNotificationSuccess() {
        store.addNotification({
            title: "Register Success !",
            message: "Now you can login here",
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

    createNotificationExist() {
        store.addNotification({
            title: "User already exist !",
            message: "Please try again",
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

    createNotificationFail() {
        store.addNotification({
            title: "Unexpected error happened !",
            message: "Please try again",
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000
            }
          });
    }

    render() {
        const {first_name, last_name, email, password, cpassword, errors, formIsValid, firstNameValid, lastNameValid, emailValid, passwordValid, cpasswordValid, term} = this.state
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <div className="row">
                            <div className="col-md-6 mt-5 mb-5 mx-auto">
                                <div style={{textAlign: "center"}}>
                                    <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                                </div>
                                <TextField
                                    fullWidth
                                    error={!firstNameValid? true: false}
                                    helperText={!formIsValid? errors['first_name']: ''}
                                    label="First name"
                                    margin="dense"
                                    name="first_name"
                                    required
                                    value={first_name}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    className="mt-3"
                                />
                                <TextField
                                    fullWidth
                                    error={!lastNameValid? true: false}
                                    helperText={!formIsValid? errors['last_name']: ''}
                                    label="Last name"
                                    margin="dense"
                                    name="last_name"
                                    required
                                    value={last_name}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    className="mt-3"
                                />
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
                                    label="Password"
                                    margin="dense"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    className="mt-3"
                                    value={password}
                                    onChange={this.onChange}
                                />
                                <TextField
                                    fullWidth
                                    error={!cpasswordValid? true: false}
                                    helperText={!formIsValid? errors['cpassword']: ''}
                                    label="Confirm password"
                                    margin="dense"
                                    name="cpassword"
                                    style={{ marginTop: '1rem' }}
                                    type="password"
                                    variant="outlined"
                                    className="mt-3"
                                    value={cpassword}
                                    onChange={this.onChange}
                                />
                                <Checkbox name="term" checked={term} onChange={e => {this.setState({ term: e.target.checked });}} color="primary"/>I have read the <a href="">Terms and Conditions</a>
                                <Button style={{width:'100%'}} className="mt-3" variant="primary" onClick={this.onSubmit}>Register</Button>
                                <div className="mt-3" style={{textAlign: 'center'}}>
                                    <Link to={`/login`}>
                                        Already have an account?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        )
    }
}

export default Register