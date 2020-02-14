import React, { Component } from 'react';
import styled from 'styled-components';
import jwt_decode  from 'jwt-decode';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 10px;
    font-size: 0.7rem;
  }
`;
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email
        })
    }

    render() {
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <div className="col-sm-8 mx-auto">
                            <h1 className="text-center">Profile</h1>
                        </div>
                        <table className="table col-md-6 mx-auto">
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    <td>{this.state.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>{this.state.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        )
    }
}

export default Profile