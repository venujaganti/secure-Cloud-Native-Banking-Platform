function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div
      style={{
        minHeight: "180px",
        display: "grid",
        placeItems: "center",
        color: "#64748b"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "3px solid #dbeafe",
            borderTopColor: "#2563eb",
            borderRadius: "50%",
            margin: "0 auto 12px",
            animation: "spin 0.8s linear infinite"
          }}
        />

        <div style={{ fontSize: "13px" }}>
          {message}
        </div>

        <style>
          {`
            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default LoadingSpinner;