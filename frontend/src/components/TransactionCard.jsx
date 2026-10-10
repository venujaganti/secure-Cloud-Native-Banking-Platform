import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

function TransactionCard({
  description,
  amount,
  type = "debit",
  date,
  status = "completed"
}) {
  const isCredit = type === "credit";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "13px",
        padding: "15px 0",
        borderBottom: "1px solid #eef2f7"
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: isCredit ? "#ecfdf5" : "#fef2f2",
          color: isCredit ? "#059669" : "#dc2626"
        }}
      >
        {isCredit ? (
          <ArrowDownLeft size={18} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#111827"
          }}
        >
          {description}
        </div>

        <div
          style={{
            marginTop: "3px",
            fontSize: "12px",
            color: "#94a3b8"
          }}
        >
          {date}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div
          style={{
            fontWeight: "700",
            color: isCredit ? "#059669" : "#111827"
          }}
        >
          {isCredit ? "+" : "-"}$
          {Number(amount).toLocaleString("en-US", {
            minimumFractionDigits: 2
          })}
        </div>

        <StatusBadge status={status} />
      </div>
    </div>
  );
}

export default TransactionCard;