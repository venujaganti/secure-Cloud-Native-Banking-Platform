import { Bell, Check } from "lucide-react";

function NotificationCard({
  title,
  message,
  time,
  unread = false
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "13px",
        padding: "16px",
        background: unread ? "#eff6ff" : "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px"
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background: unread ? "#dbeafe" : "#f1f5f9",
          color: unread ? "#2563eb" : "#64748b",
          display: "grid",
          placeItems: "center"
        }}
      >
        {unread ? <Bell size={18} /> : <Check size={18} />}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#111827"
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: "4px",
            fontSize: "13px",
            color: "#64748b"
          }}
        >
          {message}
        </div>

        <div
          style={{
            marginTop: "7px",
            fontSize: "11px",
            color: "#94a3b8"
          }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;