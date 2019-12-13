import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import '../../App.css';

const TopNavLinks = () => {
  return (
    <>
      <NavItem>
        <NavLink className="navlink" href="/PurchaseOrder">
          Purchase Order
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="navlink" href="/SalesOrder">
          Sales Order
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink className="navlink" href="/ValidState">
          Valid State
        </NavLink>
      </NavItem>
    </>
  );
};

export default TopNavLinks;
