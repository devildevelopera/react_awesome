import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Landing from './components/landing/Landing';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/landing/Profile';
import Product from './components/product/Product';
import Sell from './components/sell/Sell';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';

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
    axios.get('http://localhost:3005/posts').then(res => {
      this.setState({
        products: res.data
      });
    });
  }

  render() {
    const { quantity, products } = this.state;
    return (
        <Router>
          <ReactNotification />
            <Header quantity={quantity} history={this.props.history}/>
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
            <Route exact path="/login"
              render={(props) => <Login parentGetItems = {this.getItems}/>}
            />
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={Profile}/>
            <Footer/>
        </Router>
    );
  }
  
};
export default App;