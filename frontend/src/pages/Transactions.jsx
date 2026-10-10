import TransactionTable from "../components/TransactionTable";

const transactions = [
  {
    id: 1,
    description: "Salary Credit",
    date: "Oct 07, 2026",
    category: "Income",
    amount: 4200,
    type: "credit",
    status: "completed"
  },
  {
    id: 2,
    description: "Amazon Purchase",
    date: "Oct 06, 2026",
    category: "Shopping",
    amount: 129.45,
    type: "debit",
    status: "completed"
  },
  {
    id: 3,
    description: "Utility Payment",
    date: "Oct 05, 2026",
    category: "Utilities",
    amount: 86.2,
    type: "debit",
    status: "completed"
  },
  {
    id: 4,
    description: "Transfer to Savings",
    date: "Oct 04, 2026",
    category: "Transfer",
    amount: 500,
    type: "debit",
    status: "pending"
  }
];

function Transactions() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Transactions</h1>

      <p style={{ color: "#64748b" }}>
        Review your account transaction history.
      </p>

      <div style={{ marginTop: "24px" }}>
        <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
}

export default Transactions;