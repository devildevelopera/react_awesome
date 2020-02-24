import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Navbar, Nav, Form } from 'react-bootstrap';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ShopIcon from '@material-ui/icons/Shop';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import jwt_decode  from 'jwt-decode';
import { Dropdown } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
import './header.scss';

const IMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 35px;
  height: 35px;
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbar: {
    height: 64.781
  },
  title: {
    display: 'none',
    cursor: "pointer",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    }
  },
  white: {
    color: "#fff"
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
        <Button onClick={handleMenuClose}><HomeIcon/></Button>
      </Link>
      { localStorage.usertoken &&
      <Link to={`/sell`}>
        <Button onClick={handleMenuClose}><ShopIcon/></Button>
      </Link>
      }
      <Link to={`/cart`}>
        <Button onClick={handleMenuClose}><Badge badgeContent={number} color="secondary"><ShoppingCartIcon /></Badge></Button>
      </Link>
      
      { localStorage.usertoken &&
        <Link to={`/profile`}>
          <Button color="inherit" onClick={handleMenuClose}>
              <IMG
                  img={`${process.env.REACT_APP_SERVER_API}/uploads/profile/${photo}`}
              />
              </Button>
        </Link>
      }
      { localStorage.usertoken ? (
        <Button onClick={logOut}><LockIcon/></Button>
      ) : (
      <Link to={`/login`}>
        <Button onClick={handleMenuClose}><LockOpenIcon/></Button>
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
        <Navbar bg="primary" variant="dark" className={classes.navbar}>
          <Nav className="mr-auto">
            <Dropdown>
              <Dropdown.Toggle variant="default" id="dropdown-basic">
               <MenuIcon/>Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item><Link to={`/category/CE`}>Consumer Electronics</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/SH`}>Sports & Health</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/BT`}>Babies & Toys</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/GP`}>Groceries & Pets</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/HL`}>Home & Lifestyle</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/WF`}>Women’s Fashion</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/MF`}>Men’s Fashion</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/WA`}>Watches & Accessories</Link></Dropdown.Item>
                <Dropdown.Item><Link to={`/category/AM`}>Automotive & Motorbike</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link to={`/`}  className={classes.sectionDesktop}>
              <Button color="inherit" className={classes.white}>Home</Button>
            </Link>
            <Link to={`/`}  className={classes.sectionDesktop}>
              <Button color="inherit" className={classes.white}>About</Button>
            </Link>
            <Link to={`/`}  className={classes.sectionDesktop}>
              <Button color="inherit" className={classes.white}>Contact</Button>
            </Link>
            { localStorage.usertoken &&
            <Link to={`/sell`}  className={classes.sectionDesktop}>
              <Button color="inherit" className={classes.white}>Sell</Button>
            </Link>
            }
          </Nav>
          <div className={classes.grow}></div>
          <Form inline  className={classes.sectionDesktop}>
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
                  <Button className="signin">Sign In</Button>
                </Link>
                {/* <Link to={`/register`}>
                  <Button className={classes.white} className="signup">Sign Up</Button>
                </Link> */}
              </div>
              )}
          </Form>
            
            <IconButton
              className={classes.sectionMobile}
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              id="moreicon"
            >
              <MoreVertIcon />
            </IconButton>
            {renderMobileMenu}
            {renderMenu}
        </Navbar>
  );
}

export default withRouter(Header)