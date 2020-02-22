import React, { Component } from "react";
import styled from 'styled-components';
import './ScrollToTop.css';

const IMG = styled.div `
  background-image: url(${props => props.img});
  width: 60px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  display: inline-block;
  background-position: 50%;
  border-radius: 50%
  @media (max-width: 650px) {
    width: 40px;
    height: 40px;
  }
`;

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className="scroll-to-top">
        {is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <IMG img={"/scrolltotop.png"}/>
          </div>
        )}
      </div>
    );
  }
}