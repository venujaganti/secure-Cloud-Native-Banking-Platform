import {
  Bell,
  ChevronDown,
  Menu,
  ShieldCheck
} from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header
      style={{
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 20
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          style={{
            display: "none",
            border: "none",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          <Menu size={24} />
        </button>

        <div>
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280",
              marginBottom: "3px"
            }}
          >
            Secure Banking
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Banking Dashboard
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "7px 11px",
            borderRadius: "999px",
            background: "#ecfdf5",
            color: "#047857",
            fontSize: "12px",
            fontWeight: "600"
          }}
        >
          <ShieldCheck size={15} />
          Secure Session
        </div>

        <button
          aria-label="Notifications"
          style={{
            position: "relative",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            color: "#4b5563"
          }}
        >
          <Bell size={21} />

          <span
            style={{
              position: "absolute",
              top: "-3px",
              right: "-3px",
              width: "7px",
              height: "7px",
              background: "#ef4444",
              borderRadius: "50%"
            }}
          />
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px"
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "#dbeafe",
              color: "#1d4ed8",
              display: "grid",
              placeItems: "center",
              fontWeight: "700"
            }}
          >
            VJ
          </div>

          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#111827"
              }}
            >
              Venu Jaganti
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "#6b7280"
              }}
            >
              Personal Account
            </div>
          </div>

          <ChevronDown size={16} color="#6b7280" />
        </div>
      </div>
    </header>
  );
}

export default Header;