import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import doctorSignupImg from "../assets/SignupD.png";

export default function SignupDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    customId: ""
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

      await API.post("/users/signup", {
        ...form,
        role: "doctor"
      });

      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        {/* LEFT SIDE FORM */}
        <div className="signup-left">
          <h1 className="signup-title">Doctor Signup</h1>
          <p className="signup-subtitle">Create your CareStack doctor account</p>

          {error && <p className="signup-error">{error}</p>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-label">Full Name</label>
            <input
              className="signup-input"
              type="text"
              name="name"
              placeholder="John Doe"
              required
              onChange={handleChange}
            />

            <label className="signup-label">Email Address</label>
            <input
              className="signup-input"
              type="email"
              name="email"
              placeholder="doctor@example.com"
              required
              onChange={handleChange}
            />

            <label className="signup-label">Password</label>
            <input
              className="signup-input"
              type="password"
              name="password"
              placeholder="************"
              required
              onChange={handleChange}
            />

            <label className="signup-label">3-Digit Doctor ID</label>
            <input
              className="signup-input"
              type="number"
              name="customId"
              placeholder="123"
              required
              onChange={handleChange}
            />

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="signup-right">
          <img src={doctorSignupImg} alt="Doctor Signup" className="signup-img" />
        </div>

      </div>
    </div>
  );
}