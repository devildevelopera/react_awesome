import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const Wrapper = styled.div `
  margin-bottom: 30px;
  font-size: 14px;
  > a {
    color: #555;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 650px) {
    margin-bottom: 20px;
  }
`;
const Spacer = styled.span `
  color: ${props => props.color};
  margin: 0 10px;
`;

const Breadcrumb = ({ product }) => (
  <Wrapper>
    <Link to={'/'}>{"All Products"}</Link>
    <Spacer color="#FF6A64">&raquo;</Spacer>
    <Link to={`/product/${product._id}`}>{product.name}</Link>
  </Wrapper>
);

export default withTheme(Breadcrumb);