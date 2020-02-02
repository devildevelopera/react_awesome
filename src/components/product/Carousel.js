import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  grid-column: span 3;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
const IMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 75%;
  padding-bottom: 75%;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  margin-bottom: 10px;
  background-position: 50%;
  cursor: pointer;
`;
const LargeIMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 100%;
  padding-bottom: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 0;
  display: inline-block;
  grid-column: span 3;
`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: this.props.photos[0]
    }
  }
  
  setImg = (p) => {
    this.setState({
      img: p
    });
  };

  render() {
    const { img } = this.state;
    const { photos } = this.props;
    return (
      <Wrapper>
        <div>
          {photos.map((p,i) => {
            return <IMG
              onClick={() => this.setImg(p)}
              img={"http://localhost:3005/uploads/product/"+p} key={i}
            />
          })}
        </div>
        <LargeIMG img={`http://localhost:3005/uploads/product/${img}`} />
      </Wrapper>
    );
  }
};

export default Carousel;