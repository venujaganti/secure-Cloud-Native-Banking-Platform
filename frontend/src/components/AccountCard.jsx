import { CreditCard, Eye } from "lucide-react";

function AccountCard({
  accountName = "Primary Checking",
  accountNumber = "•••• 4821",
  balance = 24580.75,
  type = "Checking"
}) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0f3c8a, #2563eb)",
        color: "white",
        borderRadius: "18px",
        padding: "24px",
        minHeight: "190px",
        boxShadow: "0 15px 30px rgba(37, 99, 235, 0.20)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <div style={{ fontSize: "13px", opacity: 0.75 }}>
            {type}
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginTop: "4px"
            }}
          >
            {accountName}
          </div>
        </div>

        <CreditCard size={26} />
      </div>

      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            fontSize: "12px",
            opacity: 0.7
          }}
        >
          Available Balance
        </div>

        <div
          style={{
            fontSize: "30px",
            fontWeight: "800",
            marginTop: "4px"
          }}
        >
          ${balance.toLocaleString("en-US", {
            minimumFractionDigits: 2
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: "18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span style={{ fontSize: "13px", opacity: 0.75 }}>
          {accountNumber}
        </span>

        <Eye size={17} />
      </div>
    </div>
  );
}

export default AccountCard;