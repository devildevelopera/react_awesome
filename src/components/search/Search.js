import React from 'react';
import { Paper, IconButton, InputBase, Divider, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-router-dom';

import './search.css';

class Search extends React.Component {
     render() {
        const number = this.props.quantity;
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
                            <Paper style={searchStyle.paper}><img className="logo" width="200px" src="/logo.jpg" alt="logo"/></Paper>
                        </Grid>
                        <Grid item xs={6} style={searchStyle.grid} className="sectionDesktop">
                            <Paper style={searchStyle.root}>
                                <select name="product_cat" id="product_cat" className="form-control1">
                                    <option value="">Category</option>
                                    <option className="level-0" value="villa">Consumer Electronics</option>
                                    <option className="level-0" value="duplex">Duplex</option>
                                    <option className="level-0" value="home-appliances">Home Appliances</option>
                                    <option className="level-0" value="penthouse">Penthouse</option>
                                    <option className="level-0" value="mobile-phones">Mobile Phones</option>
                                    <option className="level-0" value="protection-phones">Cases &amp; Protection</option>
                                    <option className="level-0" value="power-bank">Power Banks</option>
                                    <option className="level-0" value="mobile-phone-chargers">Mobile Chargers</option>
                                    <option className="level-0" value="data-cables-phones">Data Cables</option>
                                    <option className="level-0" value="selfie-stickers">Selfie Sticks</option>
                                    <option className="level-0" value="tablets">Tablets</option>
                                    <option className="level-0" value="protection-tablets">Tablets Protection</option>
                                    <option className="level-0" value="console-gaming">Console Gaming</option>
                                    <option className="level-0" value="televisions">Televisions</option>
                                    <option className="level-0" value="refrigerators">Refrigerators</option>
                                    <option className="level-0" value="accessories">Automotive & Motorbike</option>
                                </select>
                                <InputBase
                                    style={searchStyle.input}
                                    placeholder="Search Products..."
                                    inputProps={{ "aria-label": "Search Products..." }}
                                />
                                <IconButton style={searchStyle.iconButton} aria-label="Search" className="search-icon">
                                    <SearchIcon/>
                                </IconButton>
                                <Divider style={searchStyle.divider} />
                                <IconButton
                                    color="primary"
                                    style={searchStyle.iconButton}
                                    aria-label="Directions"
                                    className="search-icon"
                                >
                                    <KeyboardArrowRightIcon/>
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid item xs style={searchStyle.grid} className="sectionDesktop">
                            <Paper style={searchStyle.paper}>
                                <Link to={'/cart'}>
                                    <Badge badgeContent={number} color="secondary">
                                        <ShoppingCartIcon/>
                                    </Badge>
                                </Link>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
         );
     }
 }
 export default Search;