import { Link } from "react-router-dom";

function InvestorDashboard() {
  return (
    <div className="grid grid-3">

      <div className="card clickable-card">
        <h3>Browse Startups</h3>
        <p>Explore startups and show interest.</p>
<br></br>
        <Link to="/search-startups">
          <button className="btn btn-primary">Browse</button>
        </Link>
      </div>

      <div className="card clickable-card">
        <h3>Funding Requests</h3>
        <p>View requests from founders seeking investment.</p>
<br></br>
        <Link to="/investor-requests">
          <button className="btn btn-secondary">View Requests</button>
        </Link>
      </div>

      <div className="card clickable-card">
        <h3>My Investments</h3>
        <p>See startups you have invested or shown interest in.</p>
<br></br>
        <Link to="/investor-startups">
          <button className="btn btn-secondary">View Startups</button>
        </Link>
      </div>

    </div>
  );
}

export default InvestorDashboard;