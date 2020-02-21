import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ProductList from './ProductList';
import FashionCarousel from './FashionCarousel';
import PageWrapper from '../ui/PageWrapper';
import Search from './Search';
import axios from 'axios';

const Wrapper = styled.div `
  padding: 0 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 0 20px;
  }
`;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {    
      this.getItems();
  }

  getItems = () => {
    axios.get(`${process.env.REACT_APP_SERVER_API}/posts`).then(res => {
      for(var i=0; i<res.data.length; i++) {
        if(!res.data[i].active) {
          delete res.data[i];
        }
      }
      this.setState({
        items: res.data
      });
    });
  }

  render() {
    return (
    <PageWrapper>
      <Paper>
        <Wrapper>
            <Search/>
            <FashionCarousel items={this.state.items}/>
            <ProductList items={this.state.items} />
        </Wrapper>
      </Paper>
    </PageWrapper>
    );
  }
}

export default Landing;