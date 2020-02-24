import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 10px;
  }
`;

class Login extends Component {
    render() {
        const email = localStorage.user_email;
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <div className="row">
                            <div className="col-md-5  mx-auto">
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
                    </Wrapper>
                </Paper>
            </PageWrapper>
        )
    }
}

export default withRouter(Login);