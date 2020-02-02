import React from 'react';
import { Button } from 'react-bootstrap';
import "./css/catagory.css"
  
 class Catagory extends React.Component {
     render() {
         return (
            <div className="buttongroup">
                <Button variant="success" className="newsales">New Sales</Button>
                <Button variant="info" className="men">men</Button>
                <Button variant="danger" className="women">Women</Button>
                <Button variant="primary" className="kids">Kids</Button>
                <Button variant="warning" className="others">Others</Button>
            </div>
         );
     }
 }
 export default Catagory;