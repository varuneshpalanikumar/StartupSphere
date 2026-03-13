import { Link } from "react-router-dom";

function ProfessionalDashboard() {

  return (

    <div className="grid grid-3">

      <div className="card clickable-card">
        <h3>Discover Startups</h3>
        <p>Find startups that need technical support.</p>

        <Link to="/search-startups">
          <button className="btn btn-primary">
            Explore
          </button>
        </Link>
      </div>

      <div className="card clickable-card">
      <h3>Joined Projects</h3>
      <p>View startups you joined.</p>

      <Link to="/professional-projects">
      <button className="btn btn-secondary">
        View Projects
      </button>
      </Link>
      </div>

      <div className="card clickable-card">
      <h3>Vote Join Requests</h3>
      <p>Vote on professional join requests.</p>

      <Link to="/vote-requests">
      <button className="btn btn-secondary">
        Review
      </button>
      </Link>
      </div>

    </div>

  );
}

export default ProfessionalDashboard;