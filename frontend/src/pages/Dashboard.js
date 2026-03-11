import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FounderDashboard from "../components/FounderDashboard";
import ProfessionalDashboard from "../components/ProfessionalDashboard";
import MentorDashboard from "../components/MentorDashboard";
import InvestorDashboard from "../components/InvestorDashboard";
import FounderStartups from "../components/FounderStartups";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome {user.name}</p>

        {user.role === "founder" && (
          <>
            <FounderDashboard user={user} />

            <div style={{ marginTop: "30px" }}>
              <h2 className="section-title">Your Startups</h2>
              <FounderStartups />
            </div>
          </>
        )}

        {user.role === "professional" && <ProfessionalDashboard user={user} />}
        {user.role === "mentor" && <MentorDashboard user={user} />}
        {user.role === "investor" && <InvestorDashboard user={user} />}
      </div>
    </>
  );
}

export default Dashboard;