import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

function SecurityAlert({
  type = "success",
  title = "Security Check Passed",
  message = "Your account is protected."
}) {
  const settings = {
    success: {
      icon: CheckCircle,
      background: "#ecfdf5",
      border: "#a7f3d0",
      color: "#047857"
    },
    warning: {
      icon: AlertTriangle,
      background: "#fffbeb",
      border: "#fde68a",
      color: "#b45309"
    },
    danger: {
      icon: ShieldAlert,
      background: "#fef2f2",
      border: "#fecaca",
      color: "#b91c1c"
    }
  };

  const config = settings[type] || settings.success;
  const Icon = config.icon;

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "15px",
        borderRadius: "12px",
        background: config.background,
        border: `1px solid ${config.border}`,
        color: config.color
      }}
    >
      <Icon size={20} />

      <div>
        <div style={{ fontWeight: "700", fontSize: "14px" }}>
          {title}
        </div>

        <div
          style={{
            marginTop: "3px",
            fontSize: "13px"
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

export default SecurityAlert;