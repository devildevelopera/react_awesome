import React, { Component } from 'react';
import styled from 'styled-components';
import jwt_decode  from 'jwt-decode';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import { store } from 'react-notifications-component';
import { userUpdate } from '../api/UserFunctions';
import { Button, TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { updatepass } from '../api/UserFunctions';
import PhoneInput from 'react-phone-input-2'
import Breadcrumb from './Breadcrumb';
import 'react-phone-input-2/lib/style.css'
import './profile.css';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 10px;
    font-size: 0.7rem;
  }
`;

const IMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 120px;
  height: 120px
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  background-position: 50%;
  border-radius: 50%
`;

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            country: '',
            city: 'The Godfather',
            photo: '',
            password: '',
            cpassword: '',
            countries: [],
            cities: [],
            selectedFile: null,
            errors: {},
            formIsValid: true,
            firstNameValid: true,
            lastNameValid: true,
            emailValid: true,
            resetPassValid: true,
            passwordValid: true,
            cpasswordValid: true
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitPass = this.onSubmitPass.bind(this);
        this.onTagChange = this.onTagChange.bind(this);
        this.createNotificationSuccess = this.createNotificationSuccess.bind(this);
        this.createNotificationFail = this.createNotificationFail.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value}, ()=>{
            if(!this.state.formIsValid) {
                this.handleValidation();
            }
            if(!this.state.resetPassValid) {
                this.handleresetPassValidation();
            }
        });
    }

    onSubmitPass(e){
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        const user = {
            password: this.state.password,
            user_id: decoded._id
        }
        if (this.handleresetPassValidation()) {
            updatepass(user).then(res => {
                if(res === "success") {
                    this.createNotificationSuccess();
                } else {
                    this.createNotificationFail();
                }
                this.setState({
                    password: '',
                    cpassword: ''
                })
            })
        }
    }

    onSubmit(e){
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        const user = {
            user_id: decoded._id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            country: this.state.country,
            city: this.state.city
        }
        if(this.handleValidation()){
            userUpdate(user).then(res => {
                if(res.statusText === "OK") {
                    this.createNotificationSuccess();
                } else {
                    this.createNotificationFail();
                }
            })
        }
    }

    handleresetPassValidation() {
            let { password, cpassword } = this.state;
            let resetPassValid = true;
            let errors = {};
            let passwordValid = true;
            let cpasswordValid = true;
            // Password
            if(!password){
                resetPassValid = false;
                passwordValid = false;
                errors["password"] = "Cannot be empty";
                }else{
                if(password.length < 8){
                    resetPassValid = false;
                    passwordValid = false;
                    errors["password"] = "At least 8 characters";
                }        
            }

            //Confirm password
            if(!cpassword){
                resetPassValid = false;
                cpasswordValid = false;
                errors["cpassword"] = "Cannot be empty";
                }else if(cpassword.length < 8){
                    resetPassValid = false;
                    cpasswordValid = false;
                    errors["cpassword"] = "At least 8 characters";
                }else{
                if(password !== cpassword) {
                    resetPassValid = false;
                    cpasswordValid = false;
                    errors["cpassword"] = "Password not match";
                }
            }

            this.setState({errors: errors, resetPassValid: resetPassValid, passwordValid: passwordValid, cpasswordValid: cpasswordValid});
        return resetPassValid;
    }

    handleValidation(){
            let { first_name, last_name, email } = this.state;
            let formIsValid = true
            let errors = {};
            let firstNameValid = true;
            let lastNameValid = true;
            let emailValid = true;

            //FIrst Name
            if(!first_name){
                formIsValid = false;
                firstNameValid = false;
                errors["first_name"] = "Cannot be empty";
            }else{
                if(!first_name.match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                firstNameValid = false;
                errors["first_name"] = "Only letters";
                }        
            }

            //Last Name
            if(!last_name){
                formIsValid = false;
                lastNameValid = false;
                errors["last_name"] = "Cannot be empty";
            }else{
                if(!last_name.match(/^[a-zA-Z]+$/)){
                formIsValid = false;
                lastNameValid = false;
                errors["last_name"] = "Only letters";
                }        
            }

            //Email
            if(!email){
            formIsValid = false;
            emailValid = false;
            errors["email"] = "Cannot be empty";
            }else{
                let lastAtPos = email.lastIndexOf('@');
                let lastDotPos = email.lastIndexOf('.');

                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                    formIsValid = false;
                    emailValid = false;
                    errors["email"] = "Email is not valid";
                    }
            }

            

        this.setState({errors: errors, formIsValid: formIsValid, firstNameValid: firstNameValid, lastNameValid: lastNameValid, emailValid: emailValid});
        return formIsValid;
    }

    createNotificationSuccess() {
        store.addNotification({
            title: "Saving Success !",
            message: "You can change your details anytime",
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

    createNotificationFail() {
        store.addNotification({
            title: "Unexpected error happened !",
            message: "Please try again",
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

    onTagChange(e, value) {
        this.setState({city: value});
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        axios.get(`${process.env.REACT_APP_SERVER_API}/users/${decoded._id}`).then(res => {
            if(res.data) {
                this.setState({
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    email: res.data.email,
                    photo: res.data.photo,
                    phone: res.data.phone,
                    country: res.data.country,
                    city: res.data.city
                });
            }
        })
        this.getCountries();
        this.getCountryName(this.state.country);
    }

    getCountries = () => {
        axios.get('https://restcountries.eu/rest/v2/all').then(res => {
            this.setState({
                countries: res.data
            })
        })
    }

    openFileDialog(e) {
        this.uploadButton.click();
    }
    
    onChangeFile(e) {
        this.setState({
            selectedFile: e.target.files[0],
        }, () => {
            this.imagesUpload();
        })
    }

    imagesUpload = () => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        let data = new FormData();
            data.append('file', this.state.selectedFile);
        const config = {
              headers: {
                      'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary";'
              }
        };
        axios.post(`${process.env.REACT_APP_SERVER_API}/users/upload/${decoded._id}`, data, config ).then(res => {
          if (res.statusText === "OK") {
            this.photoUpdate(res.data.filename);
          }
        });
      }

      photoUpdate = (filename) => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        const user = {
          filename: filename
        }
        axios.patch(`${process.env.REACT_APP_SERVER_API}/users/${decoded._id}`, user ).then(res => {
            if (res.statusText === "OK") {
                this.setState({
                    selectedFile: null,
                })
                this.componentDidMount();
                localStorage.setItem('photo', filename);
                this.props.parentGetItems();
                // window.location.reload();
            }
        });
      }

      removePhoto = () => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        axios.delete(`${process.env.REACT_APP_SERVER_API}/users/removePhoto/${decoded._id}`).then(res => {
            if (res.statusText === "OK") {
                this.componentDidMount();
                localStorage.setItem('photo', 'seller.png');
                this.props.parentGetItems();
            }
        });
      }

      getCities = (e) => {
          let cityName = e.target.value;
          if(cityName){
            axios.get(`${process.env.REACT_APP_SERVER_API}/getCities/${cityName}`).then(res => {
                let allCities = res.data;
                let matchedCities = [];
                for(let i=0; i<allCities.length; i++) {
                    if(allCities[i].country === this.state.country) {
                        matchedCities.push(allCities[i].name)
                    }
                }
                this.setState({
                    cities: matchedCities
                })
            })
          }
      }

      getCountryName = (country) => {
          let countries = this.state.countries;
          for(let i=0; i<countries.length; i++) {
              if(countries[i].alpha2Code === country) {
                  return countries[i].name;
              }
          }
      }

    render() {
        const { first_name, last_name, email, phone, country, city, photo, password, cpassword, countries, cities, errors, formIsValid, firstNameValid, lastNameValid, emailValid, resetPassValid, passwordValid, cpasswordValid } = this.state;
        
        return (
            <PageWrapper>
                <Paper>
                    <Wrapper>
                        <Breadcrumb/>
                        <div className="row">
                            <div className="col-md-6 mx-auto">
                                <div style={{textAlign:'center'}} className="mt-3">
                                    <h1 className="h3 text-center">{first_name} {last_name}</h1>
                                </div>
                                <div style={{textAlign:'center'}} className="mt-3">
                                    { photo &&
                                    <IMG
                                        img={`${process.env.REACT_APP_SERVER_API}/uploads/profile/${photo}`}
                                    />}
                                </div>
                                <div style={{textAlign:'center'}} className="mt-3">
                                    <Button
                                        color="secondary"
                                        onClick={(e) => this.openFileDialog(e)}
                                        variant="outlined"
                                        >
                                        Upload picture
                                    </Button>&nbsp;
                                    <Button variant="outlined" color="primary" onClick={this.removePhoto}>Remove picture</Button>
                                </div>
                                <input id="myInput"
                                    type="file"
                                    ref={(ref) => this.uploadButton = ref}
                                    style={{ display: 'none' }}
                                    onChange={(e) => this.onChangeFile(e)}
                                />
                                
                            </div>
                            <div className="col-md-6 mx-auto">
                                <div style={{textAlign:'center', color:'grey'}} className="mt-3">
                                    <h5>The information can be edited</h5>
                                </div>
                                <TextField
                                    fullWidth
                                    error={!firstNameValid? true: false}
                                    helperText={!formIsValid? errors['first_name']: ''}
                                    label="First name"
                                    margin="dense"
                                    name="first_name"
                                    required
                                    value={first_name}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    className="mt-3"
                                />
                                <TextField
                                    fullWidth
                                    error={!lastNameValid? true: false}
                                    helperText={!formIsValid? errors['last_name']: ''}
                                    label="Last name"
                                    margin="dense"
                                    name="last_name"
                                    required
                                    value={last_name}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    className="mt-3"
                                />
                                <TextField
                                    fullWidth
                                    error={!emailValid? true: false}
                                    helperText={!formIsValid? errors['email']: ''}
                                    label="Email Address"
                                    margin="dense"
                                    name="email"
                                    required
                                    value={email}
                                    onChange={this.onChange}
                                    variant="outlined"
                                    className="mt-3"
                                />
                                <PhoneInput
                                    country={'us'}
                                    value={phone}
                                    name="phone"
                                    onChange={phone => this.setState({ phone })}
                                />
                                <FormControl
                                    fullWidth
                                    variant="outlined"
                                    className="mt-3"
                                    margin="dense"
                                >
                                    <InputLabel htmlFor="country-native-required">Country</InputLabel>
                                    <Select
                                        label="Country"
                                        native
                                        name="country"
                                        onChange={this.onChange}
                                        value = {country}
                                    >
                                        <option value = {0}>
                                        </option>
                                        { countries.map((country, index) => (
                                                <option key = {`select-item-${index}`} value = {country.alpha2Code}>{country.name}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={cities}
                                    onChange={this.onTagChange}
                                    value={city}
                                    renderInput={params => (
                                        <TextField {...params} label="City" variant="outlined" onChange={this.getCities} fullWidth margin="dense"/>
                                    )}
                                    className="mt-2"
                                />
                                <Button style={{width:'100%'}} className="mt-3" variant="contained" onClick={this.onSubmit}  color="secondary">Save Details</Button>
                                <div style={{textAlign:'center', color:'grey'}} className="mt-3">
                                    <h5>Reset Pasword</h5>
                                </div>
                                <TextField
                                    fullWidth
                                    error={!passwordValid? true: false}
                                    helperText={!resetPassValid? errors['password']: ''}
                                    label="New Password"
                                    margin="dense"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    className="mt-3"
                                    value={password}
                                    onChange={this.onChange}
                                />
                                <TextField
                                    fullWidth
                                    error={!cpasswordValid? true: false}
                                    helperText={!resetPassValid? errors['cpassword']: ''}
                                    label="Confirm password"
                                    margin="dense"
                                    name="cpassword"
                                    style={{ marginTop: '1rem' }}
                                    type="password"
                                    variant="outlined"
                                    className="mt-3"
                                    value={cpassword}
                                    onChange={this.onChange}
                                />
                                <Button style={{width:'100%'}} onClick={this.onSubmitPass} className="mt-3" variant="contained" color="primary">Update</Button>
                            </div>
                        </div>
                    </Wrapper>
                </Paper>
            </PageWrapper>
        )
    }
}

export default Profile;