import React from 'react';
import { Paper, IconButton, InputBase, Divider, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import './topsearch.scss';

const IMG = styled.div `
  background-image: url(${props => props.img});
  background-color: #eee;
  width: 15px;
  height: 15px;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  background-position: 50%;
  border-radius: 50%;
  margin-left: 10px;
`;

class Search extends React.Component {
     render() {
        const number = this.props.quantity;
        const slug = `react_awesome_products`;
        let products = localStorage.getItem(slug)? JSON.parse(localStorage.getItem(slug)): [];
        const searchStyle = {
            root: {
              borderRadius: 21,
              padding: "2px 4px",
              margin: "auto",
              height: 42,
              alignItem: "center",
              display: "flex",
              maxWidth: 600,
              width: "100%",
              border: "1px solid #007bff"
            },
            input: {
              marginLeft: 8,
              flex: 1
            },
            iconButton: {
              padding: 10
            },
            divider: {
              width: 1,
              height: 28,
              margin: 4
            },
            paper: {
                textAlign: 'center'
              },
            grid: {
                margin: 'auto'
            }
          };
         return (
                <div>
                    <Grid container>
                        <Grid item xs style={searchStyle.grid}>
                            <Paper style={searchStyle.paper}><Link to={'/'}><img className="logo" width="200px" src="/logo.jpg" alt="logo"/></Link></Paper>
                        </Grid>
                        <Grid item xs={6} style={searchStyle.grid} className="sectionDesktop">
                            <Paper style={searchStyle.root}>
                                <select name="product_cat" id="product_cat" className="form-control1">
                                    <option value="">Category</option>
                                    <option className="level-0" value="villa">Consumer Electronics</option>
                                    <option className="level-0" value="duplex">Sports & Health</option>
                                    <option className="level-0" value="penthouse">Babies & Toys</option>
                                    <option className="level-0" value="penthouse">Groceries & Pets</option>
                                    <option className="level-0" value="penthouse">Mobile Phones</option>
                                    <option className="level-0" value="penthouse">Home & Lifestyle</option>
                                    <option className="level-0" value="penthouse">Women’s Fashion</option>
                                    <option className="level-0" value="penthouse">Men’s Fashion</option>
                                    <option className="level-0" value="penthouse">Watches & Accessories</option>
                                </select>
                                <Divider style={searchStyle.divider} />
                                <InputBase
                                    style={searchStyle.input}
                                    placeholder="Search Products..."
                                    inputProps={{ "aria-label": "Search Products..." }}
                                />
                                <IconButton style={searchStyle.iconButton} aria-label="Search" className="search-icon">
                                    <SearchIcon/>
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs style={searchStyle.grid} className="sectionDesktop">
                            <Paper className="mini-photos">
                                <Link to={'/cart'}>
                                    <Badge badgeContent={number} color="secondary" className="top-cart">
                                        <ShoppingCartIcon/>
                                    </Badge>
                                </Link>
                                <div style={{"display": "inline-block", "width": "100px"}}>
                                    { products.map((product, i) => 
                                        <IMG
                                            key = {i}
                                            img={`${product.img}`}
                                        />
                                    )}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
         );
     }
 }
 export default Search;