import React, { Component } from 'react';
import { forgotpass } from '../api/UserFunctions';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './forgotpass.css';
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions';
import compose from 'lodash/fp/compose';

class ForgotPass extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            errors: {},
            formIsValid: true
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
                    console.log(res);
                    this.props.history.push(`/resetpass`);
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

        this.setState({errors: errors, formIsValid: formIsValid});
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

    handleSubmit  = ()  => {
        this.props.dispatch(increment(5));
    }

    render() {
        const {email, errors, formIsValid} = this.state
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mt-5 mx-auto">
                        <div style={{textAlign: "center"}}>
                            <h1 className="h3 mb-3 font-weight-normal">Rcover Your Password</h1>
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
                        <button  onClick={this.onSubmit} className="btn btn-lg btn-info btn-block mt-4">
                            Send Reset Link
                        </button>
                        <div className="mt-3">
                            <Link to={`/login`}>
                                Go back to login?
                            </Link>
                        </div>
                        {/* <button onClick={this.handleSubmit} className="btn btn-lg btn-success btn-block mt-4"> Increment</button> */}
                    </div>
                </div>
            </div>
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
  )(ForgotPass);