import { useEffect, useState } from "react";
import API from "../services/api";
import StartupCard from "./StartupCard";

function ProfessionalProjects() {

  const [projects, setProjects] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await API.get(`/users/${user._id}/joined-projects`);

      setProjects(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  if (projects.length === 0) {
    return (
      <p className="muted">
        You haven't joined any startups yet.
      </p>
    );
  }

  return (

    <div className="grid grid-3">

      {projects.map((startup) => (
        <StartupCard key={startup._id} startup={startup} />
      ))}

    </div>

  );

}

export default ProfessionalProjects;