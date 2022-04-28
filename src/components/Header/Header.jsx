/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../Context';
import './Header.scss';

const Header = function Header() {
  const { theme, toggleTheme } = useContext(Context);
  const HeaderDiv = styled.div`
    background: ${(props) => props.theme[props.currentTheme].primaryBackground};
    color: ${(props) => props.theme[props.currentTheme].primaryText};
  `;
  return (
    <HeaderDiv className="Header" currentTheme={theme}>
      <div className="title">Where in the world?</div>
      <div className="theme" onClick={toggleTheme} role="button" tabIndex="0" onKeyPress={toggleTheme}>
        <img alt="moon-icon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/20/000000/external-sun-basic-ui-elements-flatart-icons-outline-flatarticons.png" className="theme-icon" />
        { theme === 'light' ? 'Light Mode' : 'Dark Mode' }
      </div>
    </HeaderDiv>
  );
};

export default Header;
