import { Link, useNavigate } from "react-router-dom";

const styles = {
  nav: {
    height: "60px",
    backgroundColor: "#0044cc",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
  },
  left: {
    fontSize: "1.2rem",
  },
  right: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  logoutBtn: {
    backgroundColor: "white",
    color: "#0044cc",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  }
};

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h2 style={{ margin: 0 }}>Carestack Clinic</h2>
      </div>

      <div style={styles.right}>
        {/* Public links */}
        {!role && (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup-doctor" style={styles.link}>Doctor Signup</Link>
            <Link to="/signup-caregiver" style={styles.link}>Caregiver Signup</Link>

          </>
        )}

        {/* Admin Links */}
        {role === "admin" && (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/patients" style={styles.link}>Patients</Link>
            <Link to="/create-patient" style={styles.link}>Add Patient</Link>
            <Link to="/signup" style={styles.link}>Create User</Link>
          </>
        )}

        {/* Doctor Links */}
        {role === "doctor" && (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/patients" style={styles.link}>My Patients</Link>
            <Link to="/create-patient" style={styles.link}>Add Patient</Link>
          </>
        )}

        {role && (
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
