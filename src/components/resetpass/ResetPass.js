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
            password: '',
            cpassword: '',
            errors: {},
            formIsValid: true
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
            user_id: localStorage.user_id
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
                localStorage.removeItem('user_id');
            })
        }
    }

    handleValidation(){
            let { password, cpassword } = this.state;
            let formIsValid = true
            let errors = {};

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
        const { password, cpassword, errors, formIsValid} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mb-5 mx-auto">
                        <div style={{textAlign: "center"}}>
                            <h1 className="h3 mb-3 font-weight-normal">Reset Your Password</h1>
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