import React, { Component } from 'react';
import { resetpass } from '../api/UserFunctions';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import { Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';

class ResetPass extends Component {
    constructor(){
        super()
        this.state = {
            password: '',
            cpassword: '',
            errors: {},
            formIsValid: true,
            passwordValid: true,
            cpasswordValid: true
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.createNotificationSuccess = this.createNotificationSuccess.bind(this);
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
            password: this.state.password,
            user_id: this.props.match.params.uid
        }
        if (this.handleValidation()) {
            resetpass(user).then(res => {
                if(res === "success") {
                    this.createNotificationSuccess();
                } else {
                    this.createNotificationFail();
                }
                this.props.history.push(`/login`);
                this.setState({
                    password: ''
                })
                localStorage.removeItem('user_email');
            })
        }
    }

    handleValidation(){
            let { password, cpassword } = this.state;
            let formIsValid = true;
            let passwordValid = true;
            let cpasswordValid = true;
            let errors = {};

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

        this.setState({errors: errors, formIsValid: formIsValid, passwordValid: passwordValid, cpasswordValid: cpasswordValid});
        return formIsValid;
    }

    createNotificationSuccess() {
        store.addNotification({
            title: "Reset Success !",
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
        const { password, cpassword, errors, formIsValid, passwordValid, cpasswordValid } = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mt-5 mb-5 mx-auto">
                        <div style={{textAlign: "center"}}>
                            <h1 className="h3 mb-3 font-weight-normal">Reset Your Password</h1>
                        </div>
                        <TextField
                            fullWidth
                            error={!passwordValid? true: false}
                            helperText={!formIsValid? errors['password']: ''}
                            label="New Password"
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
                        <Button style={{width:'100%'}} className="mt-3" variant="primary" onClick={this.onSubmit}>Reset My Password</Button>
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

export default ResetPass