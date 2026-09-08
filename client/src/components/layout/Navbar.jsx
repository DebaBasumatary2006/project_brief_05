import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Inventory Management System
      </div>

      <div className="navbar-menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;