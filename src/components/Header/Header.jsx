import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../../Context';
import { ReactComponent as MoonIcon } from '../../icons/moon-regular.svg';
import { ReactComponent as SunIcon } from '../../icons/sun-regular.svg';

import './Header.scss';

const HeaderDiv = styled.div`
  background: ${(props) => props.theme[props.currenttheme].primaryBackground};
  color: ${(props) => props.theme[props.currenttheme].primaryText};
  transition: ${(props) => props.theme[props.currenttheme].transition};

  svg {
    fill: ${(props) => props.theme[props.currenttheme].primaryText};
  }
`;

const Header = function Header() {
  const { theme, toggleTheme } = useContext(Context);

  return (
    <HeaderDiv className="Header" currenttheme={theme}>
      <div className="title">Where in the world?</div>
      <div className="theme-icon" onClick={toggleTheme} role="button" tabIndex="0" onKeyPress={toggleTheme}>
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode' }</span>
      </div>
    </HeaderDiv>
  );
};

export default Header;
