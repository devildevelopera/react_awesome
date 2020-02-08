import React, { Component } from 'react';
import { resetpass } from '../api/UserFunctions';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './resetpass.css';

class ResetPass extends Component {
    constructor(){
        super()
        this.state = {
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
            email: this.state.email,
            password: this.state.password
        }
        if (this.handleValidation()) {
            resetpass(user).then(res => {
                if(res === "success") {
                    this.props.history.push(`/login`);
                    this.createNotificationSuccess();
                    this.setState({
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
            let { email, password, cpassword } = this.state;
            let formIsValid = true
            let errors = {};

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
        const { email, password, cpassword, errors, formIsValid} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mb-5 mx-auto">
                        <div style={{textAlign: "center"}}>
                            <h1 className="h3 mb-3 font-weight-normal">Reset Your Password</h1>
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
                            Reset My Password
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPass