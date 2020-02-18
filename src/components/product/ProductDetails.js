import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import jwt_decode  from 'jwt-decode';
import './productDetail.css';

const Right = styled.div `
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 0;
  align-items: baseline;
`;
const Description = styled.div `
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
  overflow-wrap: break-word;
`;
const Price = styled.div `
  font-weight: 600;
  text-align: right;
`;
const Seller = styled.div`
  display: flex;
  margin-top: 30px;
`;
const SellerDetail = styled.div`
  margin: auto;
  @media (max-width: 650px) {
    font-size: 0.8rem;
  }
`;
const IMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 100px;
  height: 100px
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  background-position: 50%;
  border-radius: 50%
`;

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      user_id: '',
      photo: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.product.user_id;
    axios.get('http://localhost:3005/users/'+ user_id).then(res => {
      if(res.data) {
        this.setState({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          user_id: res.data._id,
          photo: res.data.photo,
        })
      }
    })
  }

  addToCart = () => {
    if(localStorage.usertoken){
      this.props.addToCart();
    }else{
      this.props.history.push(`/login`);
    }
  }
  
  render() {
    const  product  = this.props.product;
    const { first_name, last_name, user_id, photo } = this.state;
    var onlineUsers = this.props.mystate.onlineUsers;
    let tocken_id = '';
    if(localStorage.usertoken) {
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      tocken_id = decoded._id;
    }
    
    return (
      <div>
          <h2>{product.name}</h2>
          <Description>{product.description}</Description>
          <Price>
            ${product.price}
          </Price>
          <Right>
            <Button variant="contained" color="primary" className={product.user_id!==tocken_id? 'addToCart' : null}
              onClick={() => this.addToCart()} disabled={product.user_id===tocken_id}
            >
              Add To Cart
            </Button>
            <TextField
              value={this.props.quantity}
              onChange={e => this.props.setQuantity(e.target.value)}
              type="number"
              margin="normal"
              style={{ width: "40px", margin: "0 30px 0" }}
            />
          </Right>
          <h2>Seller Information</h2>
          <Seller>
            <div className='icon-container'>
              { photo &&
              <IMG
                  img={`http://localhost:3005/uploads/profile/${photo}`}
              />}
              { onlineUsers.includes(user_id) ? (
              <div className='status-circle on'></div>
              ):(
                <div className='status-circle off'></div>
              )}
            </div>
            <SellerDetail>
              <ul>
                { onlineUsers.includes(user_id) ? (
                <li className="online">Online</li>
                ):(
                  <li className="offline">Offline</li>
                )}
                <li>{first_name} {last_name}</li>
                <li>100% Positive feedback</li>
              </ul>
            </SellerDetail>
          </Seller>
        </div>
    );
  };
}

const mapStateToProps = state => ({
  mystate: state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ProductDetails);