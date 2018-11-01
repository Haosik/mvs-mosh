import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        	<Link className="navbar-brand" to="/">
	          <h3>Vidly</h3>
	        </Link>
	
	          <nav className="collapse navbar-collapse">
	            <ul className="navbar-nav mr-auto">
	              <li>
	                <NavLink exact to="/movies" className="nav-item nav-link" activeClassName="active">
	                  Movies
	                </NavLink>
	              </li>
	              <li>
	                <NavLink to="/customers" className="nav-item nav-link" activeClassName="active">
	                  Customers
	                </NavLink>
	              </li>
	              <li>
	                <NavLink to="/rentals" className="nav-item nav-link" activeClassName="active">
	                  Rentals
	                </NavLink>
	              </li>
	            </ul>
	          </nav>
        </div>

      </div>
    );
  }
}

export default Navbar;
