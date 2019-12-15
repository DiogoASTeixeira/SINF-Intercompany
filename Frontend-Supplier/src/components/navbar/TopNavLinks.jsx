import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import '../../App.css';

const TopNavLinks = () => {
  return (
    <>
      <NavItem>
        <NavLink className="navlink" href="/salesOrders">
          Sales Orders
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="navlink" href="/dashboard">
          Dashboard
        </NavLink>
      </NavItem>
    </>
  );
};

export default TopNavLinks;
