import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // reusing shared styles
import signInImage from "../assets/SignIn.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/users/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* LEFT FORM SIDE */}
        <div className="signup-left">
          <h1 className="signup-title">Welcome Back</h1>
          <p className="signup-subtitle">Sign in to your CareStack account</p>

          {error && <p className="signup-error">{error}</p>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-label">Email Address</label>
            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              onChange={handleChange}
            />

            <label className="signup-label">Password</label>
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="**************"
              required
              onChange={handleChange}
            />

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="signup-right">
          <img src={signInImage} alt="Sign in" className="signup-img" />
        </div>

      </div>
    </div>
  );
}
