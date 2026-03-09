import { Link } from "react-router-dom";

function MentorDashboard() {
  return (
    <div className="grid grid-3">
      <div className="card">
        <h3>Review Startups</h3>
        <p>Browse startups and provide reviews.</p>

        <Link to="/search-startups?mentorReviewRequested=true">
          <button className="btn btn-primary">Review</button>
        </Link>
      </div>

      <div className="card">
        <h3>Mentor Requests</h3>
        <p>See direct review and mentorship requests from founders.</p>

        <Link to="/mentor-requests">
          <button className="btn btn-secondary">View Requests</button>
        </Link>
      </div>
    </div>
  );
}

export default MentorDashboard;