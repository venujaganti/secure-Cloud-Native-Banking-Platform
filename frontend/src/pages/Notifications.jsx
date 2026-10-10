import NotificationCard from "../components/NotificationCard";

const notifications = [
  {
    id: 1,
    title: "Successful Login",
    message: "A secure login was detected from your registered device.",
    time: "10 minutes ago",
    unread: true
  },
  {
    id: 2,
    title: "Transfer Completed",
    message: "Your recent transfer has been successfully processed.",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 3,
    title: "Security Check",
    message: "Your account security verification completed successfully.",
    time: "Yesterday",
    unread: false
  }
];

function Notifications() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Notifications</h1>

      <p style={{ color: "#64748b" }}>
        Stay updated with account and security activity.
      </p>

      <div
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "800px",
          marginTop: "24px"
        }}
      >
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            {...notification}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;