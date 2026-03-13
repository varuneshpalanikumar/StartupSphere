import { Link } from "react-router-dom";

function FounderDashboard() {
  return (
    <div className="grid grid-3">
      <div className="card clickable-card">
        <h3>Create Startup</h3>
        <p>Create and publish your startup idea.</p>

        <Link to="/create-startup">
          <button className="btn btn-primary">Create</button>
        </Link>
      </div>

      <div className="card clickable-card">
        <h3>Search Mentors</h3>
        <p>Find mentors to review your startup.</p>

        <Link to="/search-users?role=mentor">
          <button className="btn btn-secondary">Find Mentors</button>
        </Link>
      </div>

      <div className="card clickable-card">
        <h3>Search Professionals</h3>
        <p>Find professionals to support your startup technically.</p>

        <Link to="/search-users?role=professional">
          <button className="btn btn-secondary">Find Professionals</button>
        </Link>
      </div>

      <div className="card clickable-card">
        <h3>Search Investors</h3>
        <p>Find investors interested in promising startups.</p>

        <Link to="/search-users?role=investor">
          <button className="btn btn-secondary">Find Investors</button>
        </Link>
      </div>

      <div className="card clickable-card">
        <h3>View Startups</h3>
        <p>Browse startup listings and portfolios.</p>

        <Link to="/search-startups">
          <button className="btn btn-secondary">Explore</button>
        </Link>
      </div>
      <div className="card clickable-card">
      <h3>Mentor Requests</h3>
      <p>Track review and mentorship requests sent to mentors.</p>

      <Link to="/founder-mentor-requests">
      <button className="btn btn-secondary">View Requests</button>
      </Link>
      </div>
      <div className="card clickable-card">
        <h3>Funding Requests</h3>
        <p>Track funding requests sent to investors.</p>

        <Link to="/founder-investor-requests">
          <button className="btn btn-secondary">
            View Requests
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FounderDashboard;