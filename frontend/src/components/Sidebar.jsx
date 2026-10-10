import {
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Send,
  Settings,
  Shield,
  User,
  Users
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: CreditCard
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: FileText
  },
  {
    label: "Transfer Money",
    path: "/transfer",
    icon: Send
  },
  {
    label: "Beneficiaries",
    path: "/beneficiaries",
    icon: Users
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User
  },
  {
    label: "Security",
    path: "/security",
    icon: Shield
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell
  }
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: "250px",
        minHeight: "calc(100vh - 72px)",
        background: "#0b1729",
        color: "#cbd5e1",
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          padding: "10px 12px",
          marginBottom: "12px",
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#64748b"
        }}
      >
        Banking
      </div>

      <nav style={{ display: "grid", gap: "5px" }}>
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 13px",
                borderRadius: "9px",
                color: isActive ? "#ffffff" : "#94a3b8",
                background: isActive ? "#1d4ed8" : "transparent",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: isActive ? "600" : "500"
              })}
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div style={{ marginTop: "auto" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "11px 13px",
            border: "none",
            borderRadius: "9px",
            background: "transparent",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;