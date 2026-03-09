import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
  <>
  <Navbar />
  <div className="page-container"></div>
    <div className="page-container">
      <div className="hero">
        <h1>StartupSphere</h1>
        <p>
          A collaborative ecosystem for founders, professionals, mentors, and investors.
        </p>

        <div className="action-row">
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-secondary">Signup</button>
          </Link>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card role-card">
          <h3>Founders</h3>
          <p>Create startups, search mentors and professionals, and build your portfolio.</p>
        </div>

        <div className="card role-card">
          <h3>Professionals</h3>
          <p>Discover startups that need technical support and request to join them.</p>
        </div>

        <div className="card role-card">
          <h3>Mentors</h3>
          <p>Review startups, provide guidance, and help promising teams grow.</p>
        </div>

        <div className="card role-card">
          <h3>Investors</h3>
          <p>Discover high-potential startups through progress, reviews, and score.</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;