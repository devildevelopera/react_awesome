import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import './header.css';

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
    },
    color: "#1976d2",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    minWidth: '200px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '30%',
      minWidth: '200px',
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
    color: "#f36bee",
  },
  turquoise: {
    color: "#40E0D0"
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
    event.preventDefault()
    localStorage.removeItem('usertoken')
    history.push(`/`)
    handleMenuClose()
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
      <Link to={`/`}>
        <Button color="inherit" >Cart({number})</Button>
      </Link>
      { localStorage.usertoken ? (
      <Link to={`/`}>
        <Button color="inherit" onClick={handleProfileMenuOpen}>Profile</Button>
      </Link>
      ) : (
      <Link to={`/login`}>
        <Button color="inherit" className={classes.red} onClick={handleMenuClose}>Sign In</Button>
      </Link>
      )}
      { !localStorage.usertoken &&
      <Link to={`/register`}>
        <Button color="inherit" className={classes.red} onClick={handleMenuClose}>Sign Up</Button>
      </Link>
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.white}>
        <Toolbar>
          <Link to={`/`}>
            <Typography className={classes.title} variant="h6" noWrap>
              AWESOME
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={`/`}>
              <Button color="inherit" className={classes.turquoise}>Home</Button>
            </Link>
            { localStorage.usertoken &&
            <Link to={`/sell`}>
              <Button color="inherit" className={classes.turquoise}>Sell</Button>
            </Link>
            }
            <Link to={`/`}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={number} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            { localStorage.usertoken ? (
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            ) : (
            <div style={{margin:"auto"}}>
              <Link to={`/login`}>
                <Button color="inherit" className={classes.red}>Sign In</Button>
              </Link>
              <Link to={`/register`}>
                <Button color="inherit" className={classes.red}>Sign Up</Button>
              </Link>
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