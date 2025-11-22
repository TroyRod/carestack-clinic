export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Carestack Clinic</h1>
        <p style={styles.subtitle}>
          A secure platform for doctors, caregivers, and administrators.
        </p>
        <a href="/login" style={styles.button}>
          Login
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "calc(100vh - 60px)", // full height MINUS navbar
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  content: {
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#333",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    background: "#0044cc",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
};
