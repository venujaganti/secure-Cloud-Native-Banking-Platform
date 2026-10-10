import StatusBadge from "./StatusBadge";

function TransactionTable({ transactions = [] }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          padding: "18px 20px",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: "700",
          color: "#111827"
        }}
      >
        Recent Transactions
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "650px"
          }}
        >
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {[
                "Description",
                "Date",
                "Category",
                "Amount",
                "Status"
              ].map((heading) => (
                <th
                  key={heading}
                  style={{
                    padding: "13px 18px",
                    textAlign: "left",
                    fontSize: "12px",
                    color: "#64748b",
                    fontWeight: "700"
                  }}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    padding: "30px",
                    textAlign: "center",
                    color: "#64748b"
                  }}
                >
                  No transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td style={{ padding: "15px 18px" }}>
                    <div style={{ fontWeight: "600", color: "#111827" }}>
                      {transaction.description}
                    </div>
                  </td>

                  <td
                    style={{
                      padding: "15px 18px",
                      color: "#64748b",
                      fontSize: "13px"
                    }}
                  >
                    {transaction.date}
                  </td>

                  <td
                    style={{
                      padding: "15px 18px",
                      color: "#64748b",
                      fontSize: "13px"
                    }}
                  >
                    {transaction.category}
                  </td>

                  <td
                    style={{
                      padding: "15px 18px",
                      fontWeight: "700",
                      color:
                        transaction.type === "credit"
                          ? "#059669"
                          : "#111827"
                    }}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {Number(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2
                    })}
                  </td>

                  <td style={{ padding: "15px 18px" }}>
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;