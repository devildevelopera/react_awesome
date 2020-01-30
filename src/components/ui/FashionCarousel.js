import React from 'react';
import { Carousel } from "react-bootstrap";
import './css/fasion_carousel.css';
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
                <img
                  className="d-block w-100"
                  src={"http://localhost:3000/uploads/"+product.img_arr[0]}
                  alt="Fashion Product Image"
                />

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