import React from 'react'
import NavItem from './NavItem'
import ls from 'local-storage'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {convertAttrStrForDisplay, convertDisplayToQueryParam} from '../../utils/pref_regex'

const NavBar = (props) => {
  const pages = () => {
    if (!!ls.get('jwt_token') && !!props.user.id) {
      let queryparams = convertDisplayToQueryParam(convertAttrStrForDisplay({category: props.user.pref_categories, level: props.user.pref_levels, location: props.user.pref_locations,}))
      return [{title: "Home", path: "/"}, {title: "Search Jobs", path: `/jobs/search?page=1${queryparams}`}]
    }
    else {
      return [{title: "Login", path: "/login"}]
    }
  }

//   const pages = !!ls.get('jwt_token') ? (
//     [
//     {title: "Home", path: "/"},
//     {title: "Search Jobs", path: "/jobs/search?"}
//   ]
// ) : (
//   [{title: "Login", path: "/login"}]
// )

  return (

    <div className="navbar-container">
      {pages().map((page => {
        return <NavItem title={page.title} path={page.path} key={page.title} />
      }))}
    </div>
  )
}

function mapStateToProps(state, props) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
