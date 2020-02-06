import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const Right = styled.div `
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 0;
  align-items: baseline;
`;
const Description = styled.div `
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
`;
const Price = styled.div `
  font-weight: 600;
  text-align: right;
`;
const Seller = styled.div`
  display: flex;
  margin-top: 30px;
`;

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      last_name: '',
      email: ''
    }
  }

  componentDidMount() {
    const user_id = this.props.product.user_id;
    axios.get('http://localhost:3005/users/'+ user_id).then(res => {
      if(res.data) {
        this.setState({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email
        })
      }
    })
  }
  
  render() {
    const  product  = this.props.product;
    const { first_name, last_name, email } = this.state;
    return (
      <div>
          <h2>{product.name}</h2>
          <Description>{product.description}</Description>
          <Price>
            ${product.price}
          </Price>
          <Right>
            <Button variant="contained" color="primary"
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
          <h2>{first_name} {last_name}</h2>
          <Seller>
            <img width="100px" src="http://localhost:3005/uploads/profile/seller.png" alt="seller"/>
            <div style={{margin: "auto"}}>
              <ul>
                <li>Offline</li>
                <li>{email}</li>
              </ul>
            </div>
          </Seller>

        </div>
    );
  };
}
export default ProductDetails;