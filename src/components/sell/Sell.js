import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import SellTable from './SellTable';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import axios from 'axios';
import jwt_decode  from 'jwt-decode';
import { store } from 'react-notifications-component';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Breadcrumb from './Breadcrumb';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './sell.css';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 10px;
    font-size: 0.7rem;
  }
`;
const RightSide = styled.div `
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   margin: 0 0 20px 0;
`;

class Sell extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      open4: false,
      name: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      selectedFile: null
    }
    this.createNotification = this.createNotification.bind(this);
  }

  componentDidMount() {    
      this.getItems();
  }

  getItems = () => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    axios.get(`${process.env.REACT_APP_SERVER_API}/posts/individual/${decoded._id}`).then(res => {
      this.props.parentGetItems();
      this.setState({
        items: res.data,
        selectedFile: null,
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: ""
      });
    });
  }

  handleClose4 = () => {
    this.setState({
      open4: false
    });
  }

  handleClickOpen4 = () => {
    this.setState({
      open4: true
    });
  }

  imagesUpload = () => {
    let data = new FormData();
    for ( let x = 0; x < this.state.selectedFile.length; x++ ) {
        data.append('file', this.state.selectedFile[x]);
    }
    const config = {
          headers: {
                  'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
          }
    };
    axios.post(`${process.env.REACT_APP_SERVER_API}/posts/upload`, data, config ).then(res => {
      if (res.statusText === "OK") {
        this.productPost(res);
      }
    });
    this.handleClose4();
  }

  productPost = (res) => {
    let img_arr = [];
    for (let y = 0; y < res.data.length; y++ ) {
      img_arr.push(res.data[y].filename);
    }
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const product = {
      user_id: decoded._id,
      name: this.state.name,
      category: this.state.category,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      img_arr: img_arr,
    }
    axios.post(`${process.env.REACT_APP_SERVER_API}/posts`, product ).then(res => {
        this.getItems();
        this.createNotification();
    });
  }

  onChangeValue = (event) => {
    var stateObject = {};
    stateObject[event.target.name] = event.target.value;
    this.setState(stateObject);
  }

  openFileDialog(e) {
    this.uploadButton.click();
  }

  onChangeFile(e) {
      this.setState({
          selectedFile: e.target.files,
      }); 
  }

  isFormValid = () => {
    return !this.state.selectedFile || !this.state.name || !this.state.category || !this.state.description || !this.state.price || !this.state.quantity;
  }

  createNotification() {
      store.addNotification({
          title: "Product Posting Success !",
          message: "You can manage your products anytime",
          type: "success",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
  }

  render () {
    const { items, open4 } = this.state;
    return (
      <PageWrapper>
        <Paper>
          <Wrapper>
            <Breadcrumb/>
            <h3>Products</h3>
            <RightSide>
              <Button variant="contained" color="primary" onClick={this.handleClickOpen4}>Add Product</Button>
              {/* <Link to={'/newproduct'}>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen4}>Add Product</Button>
              </Link> */}
            </RightSide>
            { items.length > 0 &&
              <div>
                <SellTable items={items} getItems={this.getItems}
                />
              </div>
            }
            { items.length === 0 &&
              <p>Hmmmm, there aren't any your products.</p>
            }
          </Wrapper>
          <Dialog
            open={open4}
            onClose={this.handleClose4}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <input id="myInput"
                  type="file"
                  ref={(ref) => this.uploadButton = ref}
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => this.onChangeFile(e)}
              />
              <Button variant="contained" color="secondary" onClick={(e) => this.openFileDialog(e)}>Add Images</Button>
              <TextField
                autoFocus
                margin="dense"
                value={this.state.name}
                onChange={this.onChangeValue}
                name="name"
                label="Name"
                type="text"
                fullWidth
              />
              <FormControl
                  fullWidth
                  margin="normal"
                  className="mt-2"
              >
                  <InputLabel htmlFor="country-native-required" className="InputLabel">Category</InputLabel>
                  <Select
                      label="Category"
                      native
                      name="category"
                      onChange={this.onChangeValue}
                      value = {this.state.category}
                  >
                      <option value="" />
                      <option value = {"CE"}>Consumer Electronics</option>
                      <option value = {"SH"}>Sports & Health</option>
                      <option value = {"BT"}>Babies & Toys</option>
                      <option value = {"GP"}>Groceries & Pets</option>
                      <option value = {"HL"}>Home & Lifestyle</option>
                      <option value = {"WF"}>Women's Fashion</option>
                      <option value = {"MF"}>Men's Fashion</option>
                      <option value = {"WA"}>Watches & Accessories</option>
                      <option value = {"AM"}>Automotive & Motorbike</option>
                  </Select>
              </FormControl>
              <TextField
                margin="dense"
                value={this.state.price}
                onChange={this.onChangeValue}
                name="price"
                label="Price"
                type="number"
                style={{width:"50%", padding: "1px"}}
              />
              <TextField
                margin="dense"
                value={this.state.quantity}
                onChange={this.onChangeValue}
                name="quantity"
                label="Quantity"
                type="number"
                style={{width:"50%", padding: "1px"}}
              />
              <TextField
                multiline={true}
                rows="3"
                margin="dense"
                value={this.state.description}
                onChange={this.onChangeValue}
                name="description"
                label="Description"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose4} color="primary">
                Cancel
              </Button>
              <Button onClick={this.imagesUpload} color="primary" disabled={this.isFormValid()}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </PageWrapper>
    );
  };
};
export default Sell;