import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './confirmemail.css';

class Login extends Component {
    render() {
        const email = localStorage.user_email;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mt-5 mx-auto">
                        <div style={{textAlign: "center"}}>
                            <h1 className="h3 mb-3 font-weight-normal">Confirm your email address!</h1>
                            <div className="mb-3" style={{color:'grey'}}>A confirmation e-mail has been sent to {email}.</div>
                            <div className="mb-3" style={{color:'grey'}}>Check your inbox and click on the "Confirm my email" link to reset your password.</div>
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

export default withRouter(Login);