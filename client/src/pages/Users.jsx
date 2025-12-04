import { useEffect, useState } from "react";
import API from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users");
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToAdmin = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to convert ${userName} to admin?`)) return;

    try {
      await API.put(`/users/${userId}/convert-to-admin`);
      alert("User converted to admin successfully!");
      fetchUsers(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to convert user");
    }
  };

  const handleDeleteUser = async (userId, userName, userRole) => {
    if (userRole === "admin") {
      alert("Cannot delete admin users");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) return;

    try {
      await API.delete(`/users/${userId}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <h1 style={styles.title}>All Users</h1>
        <p>Loading users...</p>
      </div>
    );
  }

  const caregivers = users.filter(u => u.role === "caregiver");
  const admins = users.filter(u => u.role === "admin");
  const doctors = users.filter(u => u.role === "doctor");

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>User Management</h1>
      <p style={styles.subtitle}>View and manage all system users</p>

      {error && <p style={styles.error}>{error}</p>}

      {/* Caregivers Section */}
      {caregivers.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Caregivers ({caregivers.length})</h2>
          <div style={styles.usersGrid}>
            {caregivers.map((user) => (
              <div key={user._id} style={styles.userCard}>
                <h3 style={styles.userName}>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Custom ID:</strong> {user.customId || "N/A"}</p>
                <div style={styles.cardActions}>
                  <button
                    onClick={() => handleConvertToAdmin(user._id, user.name)}
                    style={styles.convertBtn}
                  >
                    Convert to Admin
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name, user.role)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admins Section */}
      {admins.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Admins ({admins.length})</h2>
          <div style={styles.usersGrid}>
            {admins.map((user) => (
              <div key={user._id} style={styles.userCard}>
                <h3 style={styles.userName}>{user.name}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctors Section */}
      {doctors.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Doctors ({doctors.length})</h2>
          <p style={styles.note}>
            <a href="/admin" style={styles.link}>
              View doctors with their patients →
            </a>
          </p>
        </div>
      )}

      {users.length === 0 && (
        <p style={styles.noUsers}>No users found in the system.</p>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "20px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "var(--deep-blue)",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#666",
    marginBottom: "30px",
  },
  error: {
    color: "red",
    padding: "10px",
    backgroundColor: "#ffe6e6",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "var(--deep-blue)",
  },
  usersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
  },
  userName: {
    margin: "0 0 15px 0",
    fontSize: "1.3rem",
    color: "var(--deep-blue)",
  },
  cardActions: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  convertBtn: {
    backgroundColor: "var(--teal)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    flex: 1,
  },
  deleteBtn: {
    backgroundColor: "#cc0000",
    color: "white",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    flex: 1,
  },
  note: {
    fontSize: "1rem",
    color: "#666",
    marginTop: "10px",
  },
  link: {
    color: "var(--sky-blue)",
    textDecoration: "none",
    fontWeight: "bold",
  },
  noUsers: {
    fontSize: "1.1rem",
    color: "#666",
    textAlign: "center",
    padding: "40px",
  },
};

