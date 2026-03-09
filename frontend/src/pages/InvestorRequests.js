import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function InvestorRequests() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get(`/investor-requests/investor/${user._id}`);
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await API.put(`/investor-requests/accept/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await API.put(`/investor-requests/reject/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">Funding Requests</h1>
        <p className="page-subtitle">
          Review funding requests sent by founders.
        </p>

        {requests.length === 0 ? (
          <p className="muted">No pending funding requests.</p>
        ) : (
          <div className="grid grid-2">
            {requests.map((request) => (
              <div className="card" key={request._id}>
                <h3>{request.startup?.title}</h3>

                <p className="muted" style={{ marginBottom: "10px" }}>
                  Founder: {request.founder?.name}
                </p>

                <p>
                  <strong>Startup Score:</strong> {request.startup?.startupScore}
                </p>

                <p>
                  <strong>Progress:</strong> {request.startup?.progress}%
                </p>

                <p>
                  <strong>Funding Required:</strong> ${request.startup?.fundingRequired}
                </p>

                <p style={{ margin: "10px 0" }}>
                  <strong>Message:</strong> {request.message || "No message"}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => acceptRequest(request._id)}
                  style={{ marginRight: "10px" }}
                >
                  Accept
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => rejectRequest(request._id)}
                >
                  Reject
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InvestorRequests;