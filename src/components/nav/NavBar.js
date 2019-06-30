import React from 'react'
import NavItem from './NavItem'
import ls from 'local-storage'



const NavBar = () => {
  const pages = !!ls.get('jwt_token') ? (
    [
    {title: "Home", path: "/"},
    {title: "Search Jobs", path: "/jobs/search"}
  ]
) : (
  [{title: "Login", path: "/login"}]
)
  return (

    <div className="navbar-container">
      {pages.map((page => {
        return <NavItem title={page.title} path={page.path} key={page.title} />
      }))}
    </div>
  )
}

export default NavBar
