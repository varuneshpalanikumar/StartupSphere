import { Link } from "react-router-dom";

function StartupCard({ startup }) {
  return (
    <div className="card clickable-card">
      <h3>{startup.title}</h3>

      <p className="muted" style={{ margin: "8px 0 12px" }}>
        {startup.description}
      </p>

      <p>
        <strong>Founder:</strong> {startup.founder?.name || "Unknown"}
      </p>

      <p>
        <strong>Progress:</strong> {startup.progress}%
      </p>

      <p>
        <strong>Startup Score:</strong> {startup.startupScore}
      </p>

      <p>
        <strong>Funding Required:</strong> {startup.fundingRequired}
      </p>

      <div style={{ marginTop: "16px" }}>
        <Link to={`/startup/${startup._id}`}>
          <button className="btn btn-primary">View Portfolio</button>
        </Link>
      </div>
    </div>
  );
}

export default StartupCard;