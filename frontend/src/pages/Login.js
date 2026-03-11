import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", form);

      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (
    <div className="page-container">

      <div className="card" style={{maxWidth:"450px",margin:"40px auto"}}>

        <h2>Login</h2>

        {message && (
          <div style={{
            background:"#ffdada",
            padding:"10px",
            marginBottom:"15px",
            borderRadius:"8px"
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary">
            Login
          </button>

        </form>

        <p style={{marginTop:"15px"}}>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;