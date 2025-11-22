import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

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
      alert("Doctor account created successfully!");

      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Doctor Signup</h1>
        <p style={styles.subtitle}>Create your Carestack doctor account</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="John Doe"
          />

          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="doctor@example.com"
          />

          <label style={styles.label}>Password (10+ characters)</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="************"
          />

          <label style={styles.label}>3-Digit Doctor ID</label>
          <input
            type="number"
            name="customId"
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="123"
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "calc(100vh - 60px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  card: {
    width: "400px",
    background: "white",
    padding: "30px 35px",
    borderRadius: "12px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    marginBottom: "5px",
    fontSize: "28px",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "14px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "#333",
    marginBottom: "6px",
    fontWeight: "600",
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "16px",
    fontSize: "14px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    backgroundColor: "#ffe5e5",
    color: "#c00",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "bold",
  }
};
