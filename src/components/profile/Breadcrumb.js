import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const Wrapper = styled.div `
  margin-bottom: 20px;
  font-size: 14px;
  > a {
    color: #555;
  }
  @media (max-width: 650px) {
    margin-bottom: 10px;
  }
`;
const Spacer = styled.span `
  color: ${props => props.color};
  margin: 0 10px;
`;

const Breadcrumb = () => (
  <Wrapper>
    <Link to={'/'}>{"Home"}</Link>
    <Spacer color="#FF6A64">&raquo;</Spacer>
    <Link to={`/profile`}>Profile</Link>
  </Wrapper>
);

export default withTheme(Breadcrumb);