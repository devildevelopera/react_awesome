import React, { useState } from 'react';
import styled from 'styled-components';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withRouter } from "react-router-dom";
import ProductDetails from './ProductDetails';
import Carousel from './Carousel';
import MobileCarousel from './MobileCarousel';
import Breadcrumb from './Breadcrumb';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div `
  min-height: 100vh;
  padding: 40px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;
const Grid = styled.div `
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 40px 0;
  }
`;

function Product(props) {

  const [quantity, setQuantity] = useState(1);
  const { product } = props;

  let photos;
  if (isWidthUp('sm', props.width)) {
    photos = <Carousel photos={product.img_arr} url={product._id} />;
  } else {
    photos = <MobileCarousel photos={product.img_arr} url={product._id} />;
  }

  const addToCart = () => {

    const slug = `react_awesome_products`;
    let products = JSON.parse(localStorage.getItem(slug));
    products = Array.isArray(products) ? products : [];

    const item = {
      _id: product._id,
      img: `${process.env.REACT_APP_SERVER_API}/uploads/product/${product.img_arr[0]}`,
      name: product.name,
      price: product.price,
      quantity: quantity
    };
    products.push(item);
    localStorage.setItem(slug, JSON.stringify(products));
    props.updateNumber(products.length);
    props.history.push("/cart");
  }

  return (
    <PageWrapper>
      <Paper>
        <Wrapper>
          <Breadcrumb product={product} />
          <Grid>
            {photos}
            <div style={{ gridColumn: "span 2" }}>
              <ProductDetails
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
                addToCart={addToCart}
              />
            </div>
          </Grid>
        </Wrapper>
      </Paper>
    </PageWrapper>
  );
};
export default withWidth()(withRouter(Product));