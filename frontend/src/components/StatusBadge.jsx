function StatusBadge({ status = "pending" }) {
  const normalizedStatus = String(status).toLowerCase();

  const styles = {
    completed: {
      background: "#ecfdf5",
      color: "#047857"
    },
    success: {
      background: "#ecfdf5",
      color: "#047857"
    },
    pending: {
      background: "#fffbeb",
      color: "#b45309"
    },
    failed: {
      background: "#fef2f2",
      color: "#b91c1c"
    },
    cancelled: {
      background: "#f1f5f9",
      color: "#475569"
    }
  };

  const currentStyle =
    styles[normalizedStatus] || styles.pending;

  return (
    <span
      style={{
        display: "inline-flex",
        padding: "4px 8px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: "700",
        background: currentStyle.background,
        color: currentStyle.color,
        textTransform: "capitalize"
      }}
    >
      {normalizedStatus}
    </span>
  );
}

export default StatusBadge;