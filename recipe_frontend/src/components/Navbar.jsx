import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * Navbar with brand and auth-aware actions using Ocean Professional theme.
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Recipe Hub Home">
          <div className="brand-badge">🍳</div>
          <span>Recipe Hub</span>
          <span className="badge">Ocean Pro</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className="link">Browse</Link>
          {user && <Link to="/recipes/new" className="link">Create</Link>}
        </div>
        <div className="nav-actions">
          {!user ? (
            <>
              <Link className="btn" to="/login">Sign in</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link className="btn" to="/profile">{user?.email || "Profile"}</Link>
              <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
