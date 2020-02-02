import React from 'react';
import styled from 'styled-components';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withRouter } from "react-router-dom";
import PageWrapper from '../ui/PageWrapper';
import ProductDetails from './ProductDetails';
import Carousel from './Carousel';
import MobileCarousel from './MobileCarousel';
import Breadcrumb from './Breadcrumb';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div `
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
    <PageWrapper>
      <Paper>
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
      </Paper>
    </PageWrapper>
  );
};
export default withWidth()(withRouter(Product));