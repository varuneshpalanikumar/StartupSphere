import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CreateStartup() {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [form, setForm] = useState({
    title: "",
    description: "",
    fundingRequired: "",
    techSupportRequired: false,
    mentorshipRequired: false,
    mentorReviewRequested: false
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "founder") {
      setIsError(true);
      setMessage("Only founders can create startups");
      return;
    }

    try {
      const payload = {
        title: form.title,
        description: form.description,
        founder: user._id,
        fundingRequired: Number(form.fundingRequired) || 0,
        techSupportRequired: form.techSupportRequired,
        mentorshipRequired: form.mentorshipRequired,
        mentorReviewRequested: form.mentorReviewRequested
      };

      const res = await API.post("/startups/create", payload);

      setIsError(false);
      setMessage("Startup created successfully");

      const startupId = res.data.startup._id;

      setTimeout(() => {
        navigate(`/startup/${startupId}`);
      }, 1000);

    } catch (error) {
      console.error(error);

      setIsError(true);
      setMessage(
        error.response?.data?.message || "Failed to create startup"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-container">
        <div className="card clickable-card" style={{ maxWidth: "700px", margin: "20px auto" }}>
          <h1 className="page-title">Create Startup</h1>
          <p className="page-subtitle">
            Publish your startup idea and request the support you need.
          </p>

          {message && (
            <div
              style={{
                marginBottom: "16px",
                padding: "12px",
                borderRadius: "10px",
                background: isError ? "#fee2e2" : "#dcfce7",
                color: isError ? "#b91c1c" : "#166534",
                fontWeight: "600"
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Startup Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="AI Medical Assistant"
                required
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your startup idea, problem, and solution..."
                required
              />
            </div>

            <div className="input-group">
              <label>Funding Required</label>
              <input
                type="number"
                name="fundingRequired"
                value={form.fundingRequired}
                onChange={handleChange}
                placeholder="50000"
              />
            </div>

            <div className="input-group">
              <label>
                <input
                  type="checkbox"
                  name="techSupportRequired"
                  checked={form.techSupportRequired}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                Technical Support Required
              </label>
            </div>

            <div className="input-group">
              <label>
                <input
                  type="checkbox"
                  name="mentorshipRequired"
                  checked={form.mentorshipRequired}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                Mentorship Required
              </label>
            </div>

            <div className="input-group">
              <label>
                <input
                  type="checkbox"
                  name="mentorReviewRequested"
                  checked={form.mentorReviewRequested}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                Request Mentor Review
              </label>
            </div>

            <button className="btn btn-primary" type="submit">
              Create Startup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateStartup;