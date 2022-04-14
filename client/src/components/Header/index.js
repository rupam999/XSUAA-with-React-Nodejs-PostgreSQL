import React from 'react';
import { Link } from 'react-router-dom';
import Classes from './Header.module.css';

const Header = () => {
  return (
    <nav className={Classes.mainNav}>
      <h1>Tree Table</h1>
      <div className={Classes.navLink}>
        <Link to="/">Node Table</Link>
        <Link to="/">Full Node Table</Link>
      </div>
    </nav>
  );
};

export default Header;
