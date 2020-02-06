import React from 'react';
import styled from 'styled-components';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withRouter } from "react-router-dom";
import ProductDetails from './ProductDetails';
import Carousel from './Carousel';
import MobileCarousel from './MobileCarousel';
import Breadcrumb from './Breadcrumb';

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

  const { product } = props;

  let photos;
  if (isWidthUp('sm', props.width)) {
    photos = <Carousel photos={product.img_arr} url={product._id} />;
  } else {
    photos = <MobileCarousel photos={product.img_arr} url={product._id} />;
  }

  return (
      <Wrapper>
        <Breadcrumb product={product} />
        <Grid>
          {photos}
          <div style={{ gridColumn: "span 2" }}>
            <ProductDetails
              product={product}
              // quantity={quantity}
              // setQuantity={setQuantity}
            />
          </div>
        </Grid>
      </Wrapper>
  );
};
export default withWidth()(withRouter(Product));