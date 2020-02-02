import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';
import './sell.css';


const Table = styled.table `
  width: 100%;
  border-collapse: collapse;

  thead > tr > th {
    font-weight: normal;
    font-size: 12px;
    color: #888;
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  tbody > tr > td {
    padding: 10px 4px;
    border-bottom: 1px solid #ddd;
  }
`;
const Image = styled.div `
  background-image: url(${props => props.img});
  width: 125px;
  height: 125px;
  background-size: cover;
  background-position: 50%;
  @media (max-width: 650px) {
    width: 62px;
    height: 62px;
  }
`;
const Name = styled.div `
  font-size: 16px;
  > a {
    color: black;
    text-decoration-color: #FF6A64;
  }
`;

class SellTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open2: false,
      open4: false,
      del_id: "",
      name: "",
      description: "",
      price: "",
      edit_id: "",
      delete_img_arr: [],
      previous_img_arr: [],
      selectedFile: null,
    }
    this.createNotificationDelete = this.createNotificationDelete.bind(this);
    this.createNotificationUpdate = this.createNotificationUpdate.bind(this);
  }

  handleClose2 = () => {
    this.setState({
      open2: false
    });
  }

  handleClickOpen2 = (_id, delete_img_arr) => {
    this.setState({
      open2: true,
      del_id: _id,
      delete_img_arr: delete_img_arr
    });
  }
  
  deleteProduct = () => {
    const delete_img_arr = this.state.delete_img_arr;
    axios.delete('/posts/'+this.state.del_id, {data: delete_img_arr}).then(res => {
      this.props.getItems();
      this.createNotificationDelete();
    });
    this.setState({
      open2: false
    });
  }

  handleClose4 = () => {
    this.setState({
      open4: false
    });
  }

  handleClickOpen4 = (_id) => {
    this.setState({
      open4: true,
    });
    axios.get('/posts/'+_id).then(res => {
      this.setState({
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        edit_id: res.data._id,
        previous_img_arr: res.data.img_arr
      });
    });
  }

  productUpdate = () => {
    const product = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price
    };
    axios.patch('/posts/'+this.state.edit_id, product ).then(res => {
        this.props.getItems();
        this.createNotificationUpdate();
    });
    this.handleClose4();
  }

  productUpdateWithImages = (res) => {
    let update_img_arr = [];
    for (let y = 0; y < res.data.length; y++ ) {
      update_img_arr.push(res.data[y].filename);
    }
    const product = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      previous_img_arr: this.state.previous_img_arr,
      img_arr: update_img_arr
    }
    axios.patch('/posts/withimages/'+this.state.edit_id, product ).then(res => {
        this.props.getItems();
        this.createNotificationUpdate();
    });
    this.handleClose4();
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

  imagesUpload = () => {
    if ( !this.state.selectedFile ) {
      this.productUpdate();
    } else {
      let data = new FormData();
      for ( let x = 0; x < this.state.selectedFile.length; x++ ) {
          data.append('file', this.state.selectedFile[x]);
      }
      const config = {
            headers: {
                    'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
            }
      };
      axios.post('/posts/upload', data, config ).then(res => {
        if (res.statusText === "OK") {
          this.productUpdateWithImages(res);
        }
      });
    }
    this.handleClose4();
  }

  isFormValid = () => {
    return !this.state.name || !this.state.description || !this.state.price;
  }

  createNotificationDelete() {
      store.addNotification({
          title: "Successfully Deleted !",
          message: "You can post your products anytime",
          type: "danger",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000
          }
        });
  }

  createNotificationUpdate() {
      store.addNotification({
          title: "Successfully Updated !",
          message: "You can manage your products anytime",
          type: "info",
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
    const { open2, open4 } = this.state;
    const { items } = this.props;
    return (
        <div>
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              { items.map((d,i) => {

                return (<tr>
                          <td>
                            <Link to={`/product/`+d._id}>
                              <Image img={"http://localhost:3005/uploads/product/"+d.img_arr[0]} />
                            </Link>
                          </td>
                          <td>
                            <Name>
                              <Link to={`/product/`+d._id}>
                              {d.name}
                              </Link>
                            </Name>
                          </td>
                          <td>
                            ${d.price}
                          </td>
                          <td>
                            {d.description}
                          </td>
                          <td>
                            <EditIcon onClick={() => this.handleClickOpen4(d._id)}/>
                          </td>
                          <td>
                            <DeleteForeverIcon onClick={() => this.handleClickOpen2(d._id, d.img_arr)} />
                          </td>
                        </tr>);
                    })}
            </tbody>
          </Table>
          <Dialog
            open={open2}
            onClose={this.handleClose2}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure to delete this product?
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose2} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteProduct} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
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
              <Button variant="contained" color="secondary" className="add-images" onClick={(e) => this.openFileDialog(e)}>Edit Images</Button>
              <TextField
                margin="dense"
                value={this.state.name}
                onChange={this.onChangeValue}
                name="name"
                label="Name"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                value={this.state.description}
                onChange={this.onChangeValue}
                name="description"
                label="Description"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                value={this.state.price}
                onChange={this.onChangeValue}
                name="price"
                label="Price"
                type="number"
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
        </div>
    );
  };
};

export default withTheme(SellTable);