import React from 'react';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import ProductList from './ProductList';
import FashionCarousel from './FashionCarousel';
import Catagory from './Catagory';
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
    axios.get('/posts').then(res => {
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