import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navbar-inner">
        

        <Link to={user ? "/dashboard" : "/"} className="brand">
          <img src="/logo.png" alt="StartupSphere Logo" className="brand-logo" />
          <span>StartupSphere</span>
        </Link>
        <div className="nav-links">
          <Link to={user ? "/dashboard" : "/"}>
    Dashboard
  </Link>
          <Link to="/search-users">People</Link>
          <Link to="/search-startups">Startups</Link>
          <Link to="/top-startups">Leaderboard</Link>

          {user ? (
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;