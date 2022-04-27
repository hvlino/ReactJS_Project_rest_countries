/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import './Header.scss';

const Header = function Header() {
  const HeaderDiv = styled.div`
    background: ${(props) => props.theme[props.currentTheme].primaryBackground};
    color: ${(props) => props.theme[props.currentTheme].primaryText};
  `;
  return (
    <HeaderDiv className="Header" currentTheme="dark">
      <div className="title">Where in the world?</div>
      <div className="theme">
        <img alt="moon-icon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/20/000000/external-moon-basic-ui-elements-flatart-icons-outline-flatarticons.png" className="theme-icon" />
        Dark Mode
      </div>
    </HeaderDiv>
  );
};

export default Header;
