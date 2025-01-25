import React from 'react';
import logo from '@assets/react.svg';
import './Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="logo" />
        <span>React Drag & Drop Builder</span>
      </a>
    </nav>
  );
};

export default Navbar;