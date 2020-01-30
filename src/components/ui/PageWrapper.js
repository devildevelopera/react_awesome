import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
  max-width: 1100px;
  margin: 0px auto 50px;
  min-height: 100vh;
`;

const PageWrapper = props => (
  <Wrapper>
    { props.children}
  </Wrapper>
);
export default PageWrapper;