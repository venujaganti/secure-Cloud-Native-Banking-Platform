import { User, Mail, Phone } from "lucide-react";

function Profile() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Profile</h1>

      <p style={{ color: "#64748b" }}>
        Manage your personal banking profile.
      </p>

      <div
        style={{
          maxWidth: "700px",
          marginTop: "24px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
          padding: "25px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            paddingBottom: "20px",
            borderBottom: "1px solid #eef2f7"
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "#dbeafe",
              color: "#1d4ed8",
              display: "grid",
              placeItems: "center",
              fontSize: "20px",
              fontWeight: "800"
            }}
          >
            VJ
          </div>

          <div>
            <h2 style={{ margin: 0 }}>Venu Jaganti</h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#64748b",
                fontSize: "13px"
              }}
            >
              Premium Banking Customer
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: "18px",
            marginTop: "22px"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center"
            }}
          >
            <User size={19} color="#2563eb" />
            <div>
              <small style={{ color: "#94a3b8" }}>Full Name</small>
              <div style={{ fontWeight: "600" }}>
                Venu Jaganti
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center"
            }}
          >
            <Mail size={19} color="#2563eb" />
            <div>
              <small style={{ color: "#94a3b8" }}>Email</small>
              <div style={{ fontWeight: "600" }}>
                venu@example.com
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center"
            }}
          >
            <Phone size={19} color="#2563eb" />
            <div>
              <small style={{ color: "#94a3b8" }}>Phone</small>
              <div style={{ fontWeight: "600" }}>
                +91 XXXXX XXXXX
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;