import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/logo.svg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      const destination =
        location.state?.from || "/dashboard";

      navigate(destination, { replace: true });
    } catch (loginError) {
      setError(
        loginError?.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #07111f 0%, #0f2748 55%, #172554 100%)",
        display: "grid",
        placeItems: "center",
        padding: "24px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          borderRadius: "22px",
          padding: "38px",
          boxShadow: "0 25px 70px rgba(0,0,0,0.30)"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="SecureBank"
            style={{
              width: "170px",
              height: "48px",
              objectFit: "contain"
            }}
          />

          <h1
            style={{
              margin: "28px 0 8px",
              fontSize: "27px",
              color: "#111827"
            }}
          >
            Welcome back
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px"
            }}
          >
            Sign in to your secure banking account.
          </p>
        </div>

        {error && (
          <div
            style={{
              marginTop: "22px",
              padding: "11px",
              borderRadius: "8px",
              background: "#fef2f2",
              color: "#b91c1c",
              fontSize: "13px"
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "25px",
            display: "grid",
            gap: "17px"
          }}
        >
          <label>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "7px"
              }}
            >
              Email Address
            </div>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border: "1px solid #dbe1ea",
                borderRadius: "9px",
                fontSize: "14px"
              }}
            />
          </label>

          <label>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "7px"
              }}
            >
              Password
            </div>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px",
                border: "1px solid #dbe1ea",
                borderRadius: "9px",
                fontSize: "14px"
              }}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              border: "none",
              padding: "13px",
              borderRadius: "9px",
              background: loading ? "#93c5fd" : "#2563eb",
              color: "#ffffff",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            marginTop: "25px",
            paddingTop: "20px",
            borderTop: "1px solid #eef2f7",
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            color: "#64748b",
            fontSize: "11px"
          }}
        >
          <span>
            <ShieldCheck
              size={13}
              style={{ verticalAlign: "middle", marginRight: "4px" }}
            />
            Secure Login
          </span>

          <span>
            <LockKeyhole
              size={13}
              style={{ verticalAlign: "middle", marginRight: "4px" }}
            />
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;