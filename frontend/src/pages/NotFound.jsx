import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center"
      }}
    >
      <div>
        <div
          style={{
            fontSize: "80px",
            fontWeight: "900",
            color: "#2563eb"
          }}
        >
          404
        </div>

        <h1 style={{ color: "#111827" }}>
          Page Not Found
        </h1>

        <p style={{ color: "#64748b" }}>
          The page you are looking for does not exist.
        </p>

        <Link
          to="/dashboard"
          style={{
            display: "inline-block",
            marginTop: "10px",
            padding: "11px 18px",
            borderRadius: "8px",
            background: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            fontWeight: "700"
          }}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;