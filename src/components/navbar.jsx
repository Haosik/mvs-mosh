import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({ user }) => (
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
          {!user && (
            <>
              <li>
                <NavLink to="/login" className="nav-item nav-link" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="nav-item nav-link" activeClassName="active">
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/profile" className="nav-item nav-link" activeClassName="active">
                  {user.name}
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className="nav-item nav-link" activeClassName="active">
                  Log out
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  </div>
);

export default Navbar;
