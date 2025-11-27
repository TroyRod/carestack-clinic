import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoTiny from "../assets/logo_tiny.png";

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logoTiny} alt="CareStack Logo" className="nav-logo" />
        <h2>CareStack Clinic</h2>
      </div>

      <div className="nav-right">

        {/* Public links */}
        {!role && (
          <>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Sign In</Link>
            <Link to="/signup-doctor" className="nav-link">Doctor Signup</Link>
            <Link to="/signup-caregiver" className="nav-link">Caregiver Signup</Link>
          </>
        )}

        {/* Admin links */}
        {role === "admin" && (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/patients" className="nav-link">Patients</Link>
            <Link to="/create-patient" className="nav-link">Add Patient</Link>
            <Link to="/signup" className="nav-link">Create User</Link>
          </>
        )}

        {/* Doctor links */}
        {role === "doctor" && (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/patients" className="nav-link">My Patients</Link>
            <Link to="/create-patient" className="nav-link">Add Patient</Link>
          </>
        )}

        {role && (
          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}