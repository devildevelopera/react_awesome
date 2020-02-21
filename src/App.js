import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Redirect,
  // Switch
} from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop';
import Landing from './components/landing/Landing';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import Cart from './components/cart/Cart';
import Product from './components/product/Product';
import Sell from './components/sell/Sell';
import ForgotPass from './components/forgotpass/ForgotPass';
import ResetPass from './components/resetpass/ResetPass';
import ConfirmEmail from './components/confirmemail/ConfirmEmail';
import VerticalLinearStepper from './components/newproduct/VerticalLinearStepper';
// import Error from './components/404/Error';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import Search from './components/search/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      products: [],
    }
  }
  
  componentDidMount() {
    let slug = "react_awesome_products"
    let products = JSON.parse(localStorage.getItem(slug));
    products = Array.isArray(products) ? products : [];
    let number = products.length;
    this.setState({
      quantity: number
    });
    this.getItems();
  }

  getItems = () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/posts`).then(res => {
      this.setState({
        products: res.data
      });
    });
  }
  setQuantity = (number) => {
    this.setState({
      quantity: number ? number : 0
    });
  }

  render() {
    const { quantity, products } = this.state;
    return (
        <Router>
          <ReactNotification />
            <Search quantity={quantity}/>
            <Header quantity={quantity} history={this.props.history}/>
            {/* <Switch> */}
              <Route exact path="/"
                render={() => <Landing/>}
              />
              { products.map((product,i) =>
                  <Route exact key={`route${i}`}
                    path={`/product/${product._id}`}
                    render={() =>
                      <Product product={product} updateNumber={this.setQuantity}/>
                    }
                  />
                )
              }
              <Route exact path="/sell"
                render={() => <Sell parentGetItems = {this.getItems}/>}
              />
              <Route exact path="/login"
                render={() => <Login/>}
              />
              <Route exact path="/register" component={Register}/>
              {/* <Route exact path="/profile" component={Profile} parentGetItems = {this.getItems}/> */}
              <Route exact path="/profile"
                render={() => <Profile parentGetItems = {this.getItems}/>}
              />
              <Route exact path="/forgotpass" component={ForgotPass}/>
              <Route exact path="/resetpass/:uid" component={ResetPass}/>
              <Route exact path="/confirmemail" component={ConfirmEmail}/>
              <Route exact path="/newproduct" component={VerticalLinearStepper}/>
              <Route exact path="/cart"
                render={() => <Cart updateNumber={this.setQuantity}/>}
              />
              {/* <Route exact path="/404" render={() => <Error/>}/>
              <Redirect to="/" /> */}
            {/* </Switch> */}
            <ScrollToTop/>
            <Footer/>
        </Router>
    );
  }
  
};
export default App;