import React from 'react';
import "./css/search.scss";
import { Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Search extends React.Component {
     render() {
        const searchStyle = {
            root: {
              borderRadius: 21,
              padding: "2px 4px",
              margin: "0 auto 20px",
              height: 42,
              alignItem: "center",
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
                <Paper style={searchStyle.root} className="sectionMobile">
                    <InputBase
                        style={searchStyle.input}
                        placeholder="Search Products..."
                        inputProps={{ "aria-label": "Search Products..." }}
                    />
                    <IconButton style={searchStyle.iconButton} aria-label="Search" className="search-icon">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
         );
     }
 }
 export default Search;