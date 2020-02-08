import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { connect } from 'react-redux';
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

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      user_id: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.product.user_id;
    axios.get('http://localhost:3005/users/'+ user_id).then(res => {
      if(res.data) {
        this.setState({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          user_id: res.data._id
        })
      }
    })
  }
  
  render() {
    const  product  = this.props.product;
    const { first_name, last_name, user_id } = this.state;
    var onlineUsers = this.props.mystate.onlineUsers
    return (
      <div>
          <h2>{product.name}</h2>
          <Description>{product.description}</Description>
          <Price>
            ${product.price}
          </Price>
          <Right>
            <Button variant="contained" color="primary" className="addToCart"
            >
              Add To Cart
            </Button>
            <TextField
              // value={this.props.quantity}
              // onChange={e => props.setQuantity(e.target.value)}
              type="number"
              margin="normal"
              style={{ width: "40px", margin: "0 30px 0" }}
            />
          </Right>
          <h2>Seller Information</h2>
          <Seller>
            <div className='icon-container'>
              <img width="100px" src="http://localhost:3005/uploads/profile/seller.png" alt="seller"/>
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

export default connect(
  mapStateToProps
)(ProductDetails);