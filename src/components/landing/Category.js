import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import ProductList from './ProductList';
import PageWrapper from '../ui/PageWrapper';
import Search from './Search';
import axios from 'axios';
import { fullcategory } from '../function/FullCategory';
import Breadcrumb from './Breadcrumb';

const Wrapper = styled.div `
  padding: 40px;
  min-height: 100vh;
  @media (max-width: 650px) {
    padding: 0 20px;
  }
`;

class Category extends React.Component {
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
    axios.get(`${process.env.REACT_APP_SERVER_API}/posts/category/${this.props.category}`).then(res => {
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
            <Breadcrumb category={this.props.category} />
            <div className="mb-4">
                    <h3>{fullcategory(this.props.category)}</h3>                    
            </div>
            { this.state.items.length===0 &&
                <p>Hmmmm, there aren't any products in the category. </p>
            }
            <Search/>
            <ProductList items={this.state.items} />
        </Wrapper>
      </Paper>
    </PageWrapper>
    );
  }
}

export default Category;