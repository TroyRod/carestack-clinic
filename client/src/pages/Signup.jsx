import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import signupImage from "../assets/SignupD.png";

export default function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "doctor",
        customId: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await API.post("/users/signup", form);
            setLoading(false);
            alert("User created successfully");
            navigate("/dashboard");
        
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
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Sign up for CareStack</p>

          {error && <p className="signup-error">{error}</p>}

          <form className="signup-form" onSubmit={handleSignup}>
            <label className="signup-label">Full Name</label>
            <input
              className="signup-input"
              type="text"
              placeholder="John Doe"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label className="signup-label">Email Address</label>
            <input
              className="signup-input"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label className="signup-label">Password</label>
            <input
              className="signup-input"
              type="password"
              placeholder="At least 10 characters"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label className="signup-label">Account Type</label>
            <select name="role" value={form.role} onChange={handleChange} className="signup-input">
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>

            {form.role === "doctor" && (
              <>
                <label className="signup-label">3-Digit Doctor ID</label>
                <input
                  className="signup-input"
                  type="number"
                  placeholder="123"
                  name="customId"
                  value={form.customId}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="signup-right">
          <img src={signupImage} alt="Sign up" className="signup-img" />
        </div>

      </div>
    </div>
  );
}