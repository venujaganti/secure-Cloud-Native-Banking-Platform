import { AlertCircle } from "lucide-react";

function ErrorMessage({
  message = "Something went wrong.",
  onRetry
}) {
  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "12px",
        background: "#fef2f2",
        border: "1px solid #fecaca",
        color: "#991b1b",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}
    >
      <AlertCircle size={20} />

      <div style={{ flex: 1, fontSize: "14px" }}>
        {message}
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            border: "none",
            borderRadius: "7px",
            padding: "7px 11px",
            background: "#991b1b",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;