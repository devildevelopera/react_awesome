import React from 'react';
import styled from 'styled-components';
import { Carousel } from "react-bootstrap";
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
    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null
    };
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
                
                <FashionIMG img={"http://localhost:3000/uploads/"+product.img_arr[0]}/>

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