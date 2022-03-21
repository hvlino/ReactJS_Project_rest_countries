import React from 'react';
import './Header.scss';

const Header = function Header() {
  return (
    <div className="Header">
      <div className="title">Where in the world?</div>
      <div className="theme">
        <img alt="moon-icon" src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/20/000000/external-moon-basic-ui-elements-flatart-icons-outline-flatarticons.png" className="theme-icon" />
        Dark Mode
      </div>
    </div>
  );
};

export default Header;
