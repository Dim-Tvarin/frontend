import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      Header
      <div className="container">
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/register" end>
            Sign Up
          </NavLink>
          <NavLink to="/login" end>
            Sign In
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
