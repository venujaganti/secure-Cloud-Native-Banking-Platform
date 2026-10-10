import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

function BalanceCard({
  title = "Total Balance",
  amount = 24580.75,
  change = "+8.4%",
  positive = true
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 5px 18px rgba(15, 23, 42, 0.04)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div
            style={{
              fontSize: "13px",
              color: "#6b7280"
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: "7px",
              fontSize: "27px",
              fontWeight: "800",
              color: "#111827"
            }}
          >
            ${amount.toLocaleString("en-US", {
              minimumFractionDigits: 2
            })}
          </div>
        </div>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "#eff6ff",
            color: "#2563eb",
            display: "grid",
            placeItems: "center"
          }}
        >
          <Wallet size={20} />
        </div>
      </div>

      <div
        style={{
          marginTop: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: positive ? "#059669" : "#dc2626",
          fontSize: "13px",
          fontWeight: "600"
        }}
      >
        {positive ? (
          <ArrowUpRight size={16} />
        ) : (
          <ArrowDownLeft size={16} />
        )}

        {change}
        <span style={{ color: "#9ca3af", fontWeight: "400" }}>
          this month
        </span>
      </div>
    </div>
  );
}

export default BalanceCard;