import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="hero">
          <img
            src="/logo.png"
            alt="StartupSphere Logo"
            className="hero-logo"
          />

          <h1>StartupSphere</h1>

          <p className="hero-tagline">
            Where Startups Find the Support to Succeed
          </p>

          <p>
            A modern ecosystem where founders connect with professionals,
            mentors, and investors to build, validate, and scale promising ventures.
          </p>

          <div className="action-row">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>

            <Link to="/signup">
              <button className="btn btn-secondary">Create Account</button>
            </Link>
          </div>
        </div>

        <div className="grid grid-2">
          <div className="card role-card">
            <h3>For Founders</h3>
            <p>
              Build startup portfolios, attract professionals, request mentor reviews,
              and connect directly with investors.
            </p>
          </div>

          <div className="card role-card">
            <h3>For Professionals</h3>
            <p>
              Discover startups, join real projects, contribute technical expertise,
              and help shape new ventures.
            </p>
          </div>

          <div className="card role-card">
            <h3>For Mentors</h3>
            <p>
              Review promising startups, accept mentorship requests, and guide founders
              with experience and credibility.
            </p>
          </div>

          <div className="card role-card">
            <h3>For Investors</h3>
            <p>
              Explore high-potential startups through progress, reviews, and score,
              then evaluate funding opportunities clearly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;