import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, Collapse } from 'reactstrap';
import TopNavLinks from './TopNavLinks';
import '../../App.css';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar
      id = "navbar"
      sticky="top"
      color="transparent"
      light
      expand="md"
      className="navbar"
    >
      <NavbarBrand className="mr-2" href="/">
      </NavbarBrand>
      <a id="logoLink" className="mr-2" href="/">
        InterCompany
      </a>
      <Collapse isOpen={isOpen} navbar>
        <Nav
        id = "navbar"
        className="mr-auto" navbar>
          <TopNavLinks />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default TopNav;
