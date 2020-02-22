import React, { Component } from 'react';
import { forgotpass } from '../api/UserFunctions';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './forgotpass.css';
import { TextField } from '@material-ui/core';
import { Button } from 'react-bootstrap';

class ForgotPass extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            errors: {},
            formIsValid: true,
            emailValid: true
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
            email: this.state.email
        }

        if (this.handleValidation()) {
            forgotpass(user).then(res => {
                if(res) {
                    localStorage.setItem('user_email', this.state.email)
                    this.props.history.push(`/confirmemail`);
                    this.createNotificationSuccess();
                    this.setState({
                        email: ''
                    })
                } else {
                    this.createNotificationWarning();
                }
            })
        }
    }

    handleValidation(){
        let { email } = this.state;
        let formIsValid = true;
        let emailValid = true;
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

        this.setState({errors: errors, formIsValid: formIsValid, emailValid: emailValid});
        return formIsValid;
    }

    createNotificationSuccess() {
        store.addNotification({
            title: "Auth Success !",
            message: "Now you can rest your password",
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
            title: "Auth Failed !",
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

    render() {
        const {email, errors, formIsValid, emailValid} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mt-5 mt-5 mx-auto">
                        <div style={{textAlign: "center"}}>
                            <h1 className="h3 mb-3 font-weight-normal">Rcover Your Password</h1>
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
                        <Button style={{width:'100%'}} className="mt-3" variant="info" onClick={this.onSubmit}>Send Reset Link</Button>
                        <div className="mt-3" style={{textAlign: 'center'}}>
                            <Link to={`/login`}>
                                Go back to login?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ForgotPass);