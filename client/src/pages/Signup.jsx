import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

    const [form,setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "doctor",
        customeId: ""
    });

    const handleChange = async (e) => {
        e.preventDefault();

        try { 
            const res = await API.post("/users/signup", form);
            alert("User created successfully");
            navigate("/dashboard");
        
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    
  return (
    <div className="signup-container">
      <h1>Create User</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password (10+ characters)"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* ROLE SELECTION */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="doctor">Doctor</option>
          <option value="caregiver">Caregiver</option>
          <option value="admin">Admin</option>
        </select>

        {/* CUSTOM ID (Doctor/Caregiver only) */}
        {form.role !== "admin" && (
          <input
            type="number"
            placeholder="3-digit ID (example: 123)"
            name="customId"
            value={form.customId}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}