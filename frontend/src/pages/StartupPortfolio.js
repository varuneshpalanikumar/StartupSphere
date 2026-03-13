import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import ReviewCard from "../components/ReviewCard";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import UserInfoModal from "../components/UserInfoModal";

function StartupPortfolio() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    rating: "",
    comment: ""
  });

  const [progressForm, setProgressForm] = useState({
    progress: "",
    latestUpdate: ""
  });

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    fetchStartupDetails();
  }, [id]);

  const fetchStartupDetails = async () => {
    try {
      const res = await API.get(`/startups/details/${id}`);
      setData(res.data);

      setProgressForm({
        progress: res.data.startup.progress || "",
        latestUpdate: res.data.startup.latestUpdate || ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewChange = (e) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };

  const handleProgressChange = (e) => {
    setProgressForm({
      ...progressForm,
      [e.target.name]: e.target.value
    });
  };

  const submitReview = async () => {
    if (!user) return;

    try {
      await API.post("/reviews/add", {
        startupId: id,
        mentorId: user._id,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment
      });

      setReviewForm({
        rating: "",
        comment: ""
      });

      fetchStartupDetails();
      alert("Review submitted");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  const updateProgress = async () => {
    try {
      await API.put(`/startups/progress/${id}`, {
        progress: Number(progressForm.progress),
        latestUpdate: progressForm.latestUpdate
      });

      await API.get(`/startups/score/${id}`);
      fetchStartupDetails();

      alert("Progress updated");
    } catch (error) {
      console.error(error);
      alert("Failed to update progress");
    }
  };

  const requestJoin = async () => {
    if (!user) return;

    try {
      await API.post("/join-requests", {
        startupId: id,
        professionalId: user._id,
        message: "I would like to contribute to this startup."
      });

      alert("Join request sent");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to send join request");
    }
  };

  const showInterest = async () => {
    if (!user) return;

    try {
      await API.put(`/startups/invest/${id}`, {
        investorId: user._id
      });

      await API.get(`/startups/score/${id}`);
      fetchStartupDetails();

      alert("Investor interest added");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to show interest");
    }
  };

  if (!data) {
    return <div className="page-container">Loading startup portfolio...</div>;
  }

  const { startup, reviews, investorCount, teamSize } = data;

  const investorAlreadyLinked =
    user?.role === "investor" &&
    startup.investorsInterested?.some(
      (investor) => investor._id === user._id
    );

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">{startup.title}</h1>
        <p className="page-subtitle">
          Founded by {startup.founder?.name || "Unknown Founder"}
        </p>

        <div className="card clickable-card" style={{ marginBottom: "20px" }}>
          <p><strong>Description:</strong> {startup.description}</p>
          <p style={{ marginTop: "12px" }}>
            <strong>Latest Update:</strong> {startup.latestUpdate || "No updates yet"}
          </p>
        </div>

        <div className="grid grid-3" style={{ marginBottom: "24px" }}>
          <StatCard title="Progress" value={`${startup.progress}%`} />
          <StatCard title="Startup Score" value={startup.startupScore} />
          <StatCard title="Investors Interested" value={investorCount} />
          <StatCard title="Team Size" value={teamSize} />
          <StatCard title="Funding Required" value={`$${startup.fundingRequired}`} />
        </div>

        <p className="muted" style={{ marginBottom: "16px" }}>
          Click any joined profile card below to view contact details.
        </p>

        <h2 className="section-title">Mentors Joined</h2>

        <div className="grid grid-2" style={{ marginBottom: "24px" }}>
          {startup.mentorsJoined && startup.mentorsJoined.length > 0 ? (
            startup.mentorsJoined.map((mentor) => (
              <div
                className="card clickable-card"
                key={mentor._id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(mentor)}
              >
                <h4>
                  {mentor.name}
                  {mentor.verified && (
                    <span className="verified-badge">✔ Verified</span>
                  )}
                </h4>

                <p className="muted">{mentor.email}</p>
              </div>
            ))
          ) : (
            <p className="muted">No mentors joined yet.</p>
          )}
        </div>

        <h2 className="section-title">Professionals Joined</h2>

        <div className="grid grid-2" style={{ marginBottom: "24px" }}>
          {startup.professionalsJoined && startup.professionalsJoined.length > 0 ? (
            startup.professionalsJoined.map((professional) => (
              <div
                className="card clickable-card"
                key={professional._id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(professional)}
              >
                <h4>
                  {professional.name}
                  {professional.verified && (
                    <span className="verified-badge">✔ Verified</span>
                  )}
                </h4>

                <p className="muted">{professional.email}</p>
              </div>
            ))
          ) : (
            <p className="muted">No professionals joined yet.</p>
          )}
        </div>

        <h2 className="section-title">Investors Interested</h2>

        <div className="grid grid-2" style={{ marginBottom: "24px" }}>
          {startup.investorsInterested && startup.investorsInterested.length > 0 ? (
            startup.investorsInterested.map((investor) => (
              <div
                className="card clickable-card"
                key={investor._id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(investor)}
              >
                <h4>
                  {investor.name}
                  {investor.verified && (
                    <span className="verified-badge">✔ Verified</span>
                  )}
                </h4>

                <p className="muted">{investor.email}</p>
              </div>
            ))
          ) : (
            <p className="muted">No investors linked yet.</p>
          )}
        </div>

        {user?.role === "founder" && (
          <div className="card clickable-card" style={{ marginBottom: "24px" }}>
            <h3 className="section-title">Update Progress</h3>

            <div className="input-group">
              <label>Progress (%)</label>
              <input
                type="number"
                name="progress"
                value={progressForm.progress}
                onChange={handleProgressChange}
              />
            </div>

            <div className="input-group">
              <label>Latest Update</label>
              <textarea
                name="latestUpdate"
                value={progressForm.latestUpdate}
                onChange={handleProgressChange}
              />
            </div>

            <button className="btn btn-primary" onClick={updateProgress}>
              Save Progress
            </button>

            <Link to={`/startup/${startup._id}/requests`}>
              <button className="btn btn-secondary" style={{ marginLeft: "10px" }}>
                View Join Requests
              </button>
            </Link>
          </div>
        )}

        {user?.role === "mentor" && startup.mentorReviewRequested && (
          <div className="card clickable-card" style={{ marginBottom: "24px" }}>
            <h3 className="section-title">Add Mentor Review</h3>

            <div className="input-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={reviewForm.rating}
                onChange={handleReviewChange}
              />
            </div>

            <div className="input-group">
              <label>Comment</label>
              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewChange}
              />
            </div>

            <button className="btn btn-primary" onClick={submitReview}>
              Submit Review
            </button>
          </div>
        )}

        {user?.role === "professional" && (
          <div className="card clickable-card" style={{ marginBottom: "24px" }}>
            <h3 className="section-title">Join This Startup</h3>
            <p className="muted" style={{ marginBottom: "12px" }}>
              Request to join and contribute your technical skills.
            </p>

            <button className="btn btn-primary" onClick={requestJoin}>
              Request to Join
            </button>
          </div>
        )}

        {user?.role === "investor" && (
          <div className="card clickable-card" style={{ marginBottom: "24px" }}>
            <h3 className="section-title">Investor Action</h3>

            {investorAlreadyLinked ? (
              <>
                <p className="muted" style={{ marginBottom: "12px" }}>
                  You are already connected to this startup through an accepted funding request.
                </p>

                <button className="btn btn-secondary" disabled>
                  Funding Request Accepted
                </button>
              </>
            ) : (
              <>
                <p className="muted" style={{ marginBottom: "12px" }}>
                  Show interest in this startup to support its growth.
                </p>

                <button className="btn btn-primary" onClick={showInterest}>
                  Show Interest
                </button>
              </>
            )}
          </div>
        )}

        <h2 className="section-title">Mentor Reviews</h2>

        <div className="grid grid-2">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))
          ) : (
            <p className="muted">No mentor reviews yet.</p>
          )}
        </div>
      </div>

      <UserInfoModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}

export default StartupPortfolio;