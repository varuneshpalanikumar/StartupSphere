import { Link } from "react-router-dom";

function InvestorDashboard() {
  return (
    <div className="grid grid-3">
      <div className="card">
        <h3>Explore Startups</h3>
        <p>Find promising startups to invest in.</p>

        <Link to="/search-startups">
          <button className="btn btn-primary">
            Explore
          </button>
        </Link>
      </div>

      <div className="card">
        <h3>Funding Requests</h3>
        <p>Review funding requests sent by founders.</p>

        <Link to="/investor-requests">
          <button className="btn btn-secondary">
            View Requests
          </button>
        </Link>
      </div>

      <div className="card">
        <h3>High Score Startups</h3>
        <p>See startups with the highest startup score.</p>

        <Link to="/top-startups">
          <button className="btn btn-secondary">
            View
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InvestorDashboard;