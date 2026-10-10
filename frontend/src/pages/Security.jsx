import { ShieldCheck, Smartphone, KeyRound } from "lucide-react";
import SecurityAlert from "../components/SecurityAlert";

function Security() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Security Center</h1>

      <p style={{ color: "#64748b" }}>
        Review and manage your account security controls.
      </p>

      <div
        style={{
          display: "grid",
          gap: "16px",
          maxWidth: "800px",
          marginTop: "24px"
        }}
      >
        <SecurityAlert
          type="success"
          title="Your account is secure"
          message="No suspicious authentication activity has been detected."
        />

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <ShieldCheck size={24} color="#059669" />

          <div>
            <strong>Two-Factor Authentication</strong>

            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "4px"
              }}
            >
              Enabled for your account.
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <Smartphone size={24} color="#2563eb" />

          <div>
            <strong>Trusted Devices</strong>

            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "4px"
              }}
            >
              2 trusted devices registered.
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "14px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <KeyRound size={24} color="#7c3aed" />

          <div>
            <strong>Password</strong>

            <div
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "4px"
              }}
            >
              Last changed 30 days ago.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;