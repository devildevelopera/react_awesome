import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import jwt_decode  from 'jwt-decode';
// import { useSelector, useDispatch } from 'react-redux';
import './header.css';

const IMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 30px;
  height: 30px;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  background-position: 50%;
  border-radius: 50%
`;

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  white: {
    background: "#fff",
    color: "#333",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    cursor: "pointer",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  turquoise: {
    color: "#28a745"
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    alignItems: 'center',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Header({quantity, history}) {
  // const counter = useSelector(state => state.counter);
  // console.log("counter: ", counter);
  // const dispatch = useDispatch();
  const photo = localStorage.photo;
  const classes = useStyles();
  const number = quantity ? quantity : '0';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logOut = event => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    axios.delete(`${process.env.REACT_APP_SERVER_API}/users/logout/${decoded._id}`);
    event.preventDefault()
    localStorage.removeItem('usertoken');
    localStorage.removeItem('photo');
    history.push(`/`);
    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link className="my-profile" to={`/profile`}>My Profile</Link>
      </MenuItem>
      <MenuItem onClick={logOut}>Log Out</MenuItem>
    </Menu>
    
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={`/`}>
        <Button color="inherit" className={classes.turquoise} onClick={handleMenuClose}>Home</Button>
      </Link>
      { localStorage.usertoken &&
      <Link to={`/sell`}>
        <Button color="inherit" className={classes.turquoise} onClick={handleMenuClose}>Sell</Button>
      </Link>
      }
      <Link to={`/cart`}>
        <Button color="inherit" className={classes.turquoise} onClick={handleMenuClose}>Cart<span style={{color:"#f50057"}}>({number})</span></Button>
      </Link>
      
      { localStorage.usertoken &&
        <Link to={`/profile`}>
          <Button color="inherit" className={classes.turquoise} onClick={handleMenuClose}>Profile</Button>
        </Link>
      }
      { localStorage.usertoken ? (
        <Button color="inherit" className={classes.turquoise} onClick={logOut}>Sign out</Button>
      ) : (
      <Link to={`/login`}>
        <Button color="inherit" className="signin" onClick={handleMenuClose}>Sign In</Button>
      </Link>
      )}
      {/* { !localStorage.usertoken &&
      <Link to={`/register`}>
        <Button color="inherit" className="signup" onClick={handleMenuClose}>Sign Up</Button>
      </Link>
      } */}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.white}>
        <Toolbar>
          <Link to={`/`}>
              <img width="150px" src="/logo.jpg" alt="logo"/>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <Button onClick={() => dispatch(increment(5))}>+</Button>
            <Button onClick={() => dispatch(decrement())}>-</Button> */}
            <Link to={`/`}>
              <Button color="inherit" className={classes.turquoise}>Home</Button>
            </Link>
            { localStorage.usertoken &&
            <Link to={`/sell`}>
              <Button color="inherit" className={classes.turquoise}>Sell</Button>
            </Link>
            }
            <Link to={`/cart`}>
              <IconButton aria-label="show 4 new mails" color="inherit" className={classes.turquoise}>
                <Badge badgeContent={number} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            { localStorage.photo ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <IMG
                  img={`${process.env.REACT_APP_SERVER_API}/uploads/profile/${photo}`}
              />
            </IconButton>
            ) : (
            <div>
              <Link to={`/login`}>
                <Button color="inherit" className="signin">Sign In</Button>
              </Link>
              {/* <Link to={`/register`}>
                <Button color="inherit" className="signup">Sign Up</Button>
              </Link> */}
            </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
        {renderMobileMenu}
      {renderMenu}
      </AppBar>
     
    </div>
  );
}

export default withRouter(Header)