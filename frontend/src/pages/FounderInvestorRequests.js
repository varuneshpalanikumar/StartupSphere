import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function FounderInvestorRequests() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get(`/investor-requests/founder/${user._id}`);
      setRequests(res.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to fetch funding requests");
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      await API.put(`/investor-requests/${action}/${requestId}`);

      setIsError(false);
      setMessage(
        action === "accept"
          ? "Funding request accepted successfully"
          : "Funding request rejected successfully"
      );

      fetchRequests();
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to update funding request");
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">Your Funding Requests</h1>
        <p className="page-subtitle">
          Track funding requests sent to investors.
        </p>

        {message && (
          <div className={isError ? "alert-error" : "alert-success"}>
            {message}
          </div>
        )}

        {requests.length === 0 ? (
          <p className="muted">No funding requests sent yet.</p>
        ) : (
          <div className="grid grid-2">
            {requests.map((request) => (
              <div className="card clickable-card" key={request._id}>
                <h3>{request.startup?.title}</h3>

                <p>
                  <strong>Investor:</strong> {request.investor?.name}
                </p>

                <p>
                  <strong>Status:</strong> {request.status}
                </p>

                <p style={{ marginTop: "10px" }}>
                  <strong>Message:</strong> {request.message || "No message"}
                </p>

                {request.status === "pending" && (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "16px",
                      flexWrap: "wrap"
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={() => handleRequestAction(request._id, "accept")}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => handleRequestAction(request._id, "reject")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FounderInvestorRequests;