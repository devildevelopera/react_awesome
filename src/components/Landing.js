import React from 'react';
import styled from 'styled-components';

import PageWrapper from './ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ProductList from './ui/ProductList';
import FashionCarousel from './ui/FashionCarousel';
import Catagory from './ui/Catagory';
import axios from 'axios';

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
    axios.get('http://151.106.5.210:3005/posts').then(res => {
      this.setState({
        items: res.data
      });
    });
  }
  render() {
    return (
      <PageWrapper>
        <Catagory/>
        <FashionCarousel items={this.state.items}/>
        <Paper style={{ padding: "40px" }}>
          <ProductList items={this.state.items} />
        </Paper>
      </PageWrapper>
    );
  }
}

export default Landing;