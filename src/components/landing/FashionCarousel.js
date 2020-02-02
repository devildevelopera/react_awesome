import React from 'react';
import styled from 'styled-components';
import { Carousel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './css/fasion_carousel.css';

const FashionIMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #ddd;
  width: 100% !important;
  height: 60vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  display: block !important;
`;

class FashionCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  
  render() {
    const { index, direction } = this.state;
    const products  = this.props.items;
    return (
        <div>
        <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
          >
            { products.map((product,i) => {
              return <Carousel.Item>
                <Link key={i} to={`/product/`+product._id}>
                  <FashionIMG img={"http://localhost:3005/uploads/product/"+product.img_arr[0]}/>
                </Link>
                <Carousel.Caption>
                  <h3>{product.name}</h3>
                  <p>
                  {product.description}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            })}
          </Carousel>
        </div>
    );
  }
};

export default FashionCarousel;