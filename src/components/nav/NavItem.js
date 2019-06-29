import React from 'react'
import { NavLink } from 'react-router-dom';

const NavItem = (page) => {
  return (
    <NavLink className="nav-item" to={page.path} activeStyle={{textDecoration:"underline"}}>
      {page.title}
    </NavLink>
  )
}

export default NavItem
