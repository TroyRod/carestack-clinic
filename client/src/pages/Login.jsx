import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/users/login", { email, password });

      // Save token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);  // <<< FIXED
      localStorage.setItem("customId", res.data.user.customId || "");

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/dashboard");
      } else if (res.data.user.role === "doctor") {
        navigate("/patients");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

//
// STYLES
//
const styles = {
  container: {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};
