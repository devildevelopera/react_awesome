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
            formIsValid: true
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
        if (this.handleValidation()) {
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

            //FIrst Name
            if(!first_name){
                formIsValid = false;
                errors["first_name"] = "Cannot be empty";
             }else{
                if(!first_name.match(/^[a-zA-Z]+$/)){
                   formIsValid = false;
                   errors["first_name"] = "Only letters";
                }        
             }

            //Last Name
            if(!last_name){
                formIsValid = false;
                errors["last_name"] = "Cannot be empty";
             }else{
                if(!last_name.match(/^[a-zA-Z]+$/)){
                   formIsValid = false;
                   errors["last_name"] = "Only letters";
                }        
             }

            //Email
            if(!email){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
            }else{
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    errors["email"] = "Email is not valid";
                    }
            }

            //Password
            if(!password){
                formIsValid = false;
                errors["password"] = "Cannot be empty";
                }else{
                if(password.length < 8){
                    formIsValid = false;
                    errors["password"] = "At least 8 characters";
                }        
            }

            //Confirm password
            if(!cpassword){
                formIsValid = false;
                errors["cpassword"] = "Cannot be empty";
                }else if(cpassword.length < 8){
                    formIsValid = false;
                    errors["cpassword"] = "At least 8 characters";
                }else{
                if(password !== cpassword) {
                    formIsValid = false;
                    errors["cpassword"] = "Password not match";
                }
            }

        this.setState({errors: errors, formIsValid: formIsValid});
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
        const {first_name, last_name, email, password, cpassword, errors, formIsValid} = this.state
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <div className="row">
                            <div className="col-md-6 mt-5 mb-5 mx-auto">
                                <div style={{textAlign: "center"}}>
                                    <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="first_name">First Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter First Name"
                                        value={first_name}
                                        onChange={this.onChange}
                                        />
                                    {!formIsValid &&
                                        <div style={{color: "red"}}>{errors['first_name']}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Last Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        name="last_name"
                                        placeholder="Enter Last Name"
                                        value={last_name}
                                        onChange={this.onChange}
                                        />
                                    {!formIsValid &&
                                        <div style={{color: "red"}}>{errors['last_name']}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={this.onChange}
                                        />
                                    {!formIsValid &&
                                        <div style={{color: "red"}}>{errors['email']}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        name="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={this.onChange}
                                        />
                                    {!formIsValid &&
                                        <div style={{color: "red"}}>{errors['password']}</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Password Conformation</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        name="cpassword"
                                        placeholder="Confirm Password"
                                        value={cpassword}
                                        onChange={this.onChange}
                                        />
                                    {!formIsValid &&
                                        <div style={{color: "red"}}>{errors['cpassword']}</div>
                                    }
                                </div>
                                <button onClick={this.onSubmit} type="submit" className="btn  btn-lg btn-primary btn-block mt-4">
                                    Register
                                </button>
                                <div className="mt-3">
                                    <Link to={`/login`}>
                                        Already have an account
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