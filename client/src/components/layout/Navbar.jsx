import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link className="navbar-brand" to="/" aria-label="Inventory Management System home">
        Inventory Management System
      </Link>

      <div className="navbar-menu">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/product-entry"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Product Entry
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Profile
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;