import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import config from './assets/store_config';
import Landing from './components/Landing';

import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import Product from './components/product/Product';
import Sell from './components/sell/Sell';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      products: []
    }
  }
  
  ComponentDidMount() {
    const slug = `react_awesome_products`;
    const items = JSON.parse(localStorage.getItem(slug));
    this.setState({
      quantity: items ? items.length : 0
    });
  }

  componentDidMount() {    
    this.getItems();
  }

  getItems = () => {
    axios.get('http://151.106.5.210:3005/posts').then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  render() {
    const { quantity, products } = this.state;
    return (
        <Router>
            <Header quantity={quantity}/>
            <Route exact path="/"
              render={(props) => <Landing/>}
            />
            { products.map((product,i) =>
                <Route exact key={`route${i}`}
                  path={`/product/${product._id}`}
                  render={(props) =>
                    <Product product={product}/>
                  }
                />
              )
            }
            <Route exact path="/sell"
              render={(props) => <Sell parentGetItems = {this.getItems}/>}
            />
            <Footer/>
        </Router>
    );
  }
  
};
export default App;