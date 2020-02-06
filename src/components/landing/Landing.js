import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ProductList from './ProductList';
import FashionCarousel from './FashionCarousel';
import Catagory from './Catagory';
import axios from 'axios';
import './css/landing.css';

const Wrapper = styled.div `
  padding: 0 40px 40px 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {    
      this.getItems();
  }

  getItems = () => {
    axios.get('http://localhost:3005/posts').then(res => {
      this.setState({
        items: res.data
      });
    });
  }

  render() {
    return (
      <Wrapper>
        <Catagory/>
        <FashionCarousel items={this.state.items}/>
        <Paper className="product-list">
          <ProductList items={this.state.items} />
        </Paper>
      </Wrapper>
    );
  }
}

export default Landing;