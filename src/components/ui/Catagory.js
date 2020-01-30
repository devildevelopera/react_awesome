import React from 'react';
import {Button} from 'react-bootstrap';
import "./css/catagory.css"
  
 class Catagory extends React.Component {
     render() {
         return (
            <div className="buttongroup">
                <Button variant="success">New Sales</Button>
                <Button variant="info">men</Button>
                <Button variant="danger">Women</Button>
                <Button variant="primary">Kids</Button>
                <Button variant="warning">Others</Button>
            </div>
         );
     }
 }
 export default Catagory;