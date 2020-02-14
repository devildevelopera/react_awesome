import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { compose } from 'redux';

const Wrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
  > a {
    text-decoration: none;
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 20px;
  }
`;
const LargeIMG = styled.div `
  // border-radius: 20px;
  background-image: url(${props => props.img});
  background-color: #ddd;
  width: 100%;
  padding-bottom: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  display: inline-block;
`;
const ImgWrapper = styled.div `
  border-bottom: 3px solid ${props => props.borderColor};
  display: flex;
`;
const Title = styled.div `
  color: black;
  text-decoration-color: #FF7400;
  margin-top: 10px;
  @media (max-width: 650px) {
    font-size: 14px;
  }
`;
const Price = styled.span `
  display: block;
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;

class ProductList extends React.Component {
  
  render() {
    const products = this.props.items;
    return (
      <Wrapper>
        { products.map((product,i) => {
          return <Link key={i} to={`/product/`+product._id}>
            <ImgWrapper borderColor="#fff">
              <LargeIMG img={"http://localhost:3005/uploads/product/"+product.img_arr[0]}/>
            </ImgWrapper>
            <Title>
              {product.name}
              <Price>${product.price}</Price>
            </Title>
          </Link>
        })}
      </Wrapper>
    );
  };
}

const mapStateToProps = state => ({
  mystate: state
})

export default compose(
  withTheme,
  connect(mapStateToProps)
)(ProductList);