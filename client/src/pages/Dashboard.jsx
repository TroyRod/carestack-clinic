export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.subtitle}>Welcome, {role === "admin" ? "Administrator" : "Doctor"}.</p>

      <div style={styles.grid}>


        {/* ADMIN ONLY CARDS */}
        {role === "admin" && (
          <>
            <a href="/patients" style={styles.card}>
              <h2>Manage Patients</h2>
              <p>View and manage all patients in the system.</p>
            </a>

            <a href="/create-patient" style={styles.card}>
              <h2>Add Patient</h2>
              <p>Create a new patient record.</p>
            </a>

            <a href="/medications" style={styles.card}>
              <h2>Manage Medications</h2>
              <p>View all medications and prescriptions.</p>
            </a>

            <a href="/signup" style={styles.card}>
              <h2>Create User</h2>
              <p>Add new doctors or caregivers.</p>
            </a>

            <a href="/admin" style={styles.card}>
              <h2>Manage Doctors</h2>
              <p>View doctors and their patients.</p>
            </a>

            <a href="/users" style={styles.card}>
              <h2>Manage Users</h2>
              <p>View all users and convert caregivers to admin.</p>
            </a>
          </>
        )}


        {/* DOCTOR ONLY CARDS */}
        {role === "doctor" && (
          <>
            <a href="/patients" style={styles.card}>
              <h2>My Patients</h2>
              <p>View patients assigned to you.</p>
            </a>

            <a href="/create-patient" style={styles.card}>
              <h2>Add Patient</h2>
              <p>Add a new patient and begin treatment.</p>
            </a>
          </>
        )}


      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "40px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#555",
    fontSize: "1.2rem",
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "0 40px",
  },
  card: {
    display: "block",
    padding: "25px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "black",
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  hover: {
    transform: "translateY(-5px)",
  },
};
