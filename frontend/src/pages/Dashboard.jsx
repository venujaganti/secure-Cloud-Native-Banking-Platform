import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import AccountCard from "../components/AccountCard";
import BalanceCard from "../components/BalanceCard";
import SecurityAlert from "../components/SecurityAlert";
import TransactionCard from "../components/TransactionCard";

const transactions = [
  {
    id: 1,
    description: "Salary Credit",
    amount: 4200,
    type: "credit",
    date: "Oct 07, 2026",
    status: "completed"
  },
  {
    id: 2,
    description: "Amazon Purchase",
    amount: 129.45,
    type: "debit",
    date: "Oct 06, 2026",
    status: "completed"
  },
  {
    id: 3,
    description: "Utility Payment",
    amount: 86.2,
    type: "debit",
    date: "Oct 05, 2026",
    status: "completed"
  }
];

function Dashboard() {
  return (
    <div>
      <div
        style={{
          marginBottom: "22px"
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "27px",
            color: "#111827"
          }}
        >
          Good afternoon, Venu
        </h1>

        <p
          style={{
            margin: "6px 0 0",
            color: "#64748b",
            fontSize: "14px"
          }}
        >
          Here is your financial overview.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "22px"
        }}
      >
        <BalanceCard
          title="Total Balance"
          amount={24580.75}
          change="+8.4%"
        />

        <BalanceCard
          title="Monthly Income"
          amount={6200}
          change="+4.2%"
        />

        <BalanceCard
          title="Monthly Spending"
          amount={1840.25}
          change="-3.1%"
          positive={true}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 0.9fr) minmax(320px, 1.4fr)",
          gap: "20px"
        }}
      >
        <div>
          <AccountCard />

          <div style={{ marginTop: "18px" }}>
            <SecurityAlert
              type="success"
              title="Account Security Healthy"
              message="No suspicious login activity has been detected."
            />
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "20px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "18px"
              }}
            >
              Recent Activity
            </h2>

            <Link
              to="/transactions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none",
                color: "#2563eb",
                fontSize: "13px",
                fontWeight: "600"
              }}
            >
              View all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div style={{ marginTop: "12px" }}>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                {...transaction}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#64748b",
          fontSize: "12px"
        }}
      >
        <ShieldCheck size={15} color="#059669" />
        Your banking session is protected with enterprise security controls.
      </div>
    </div>
  );
}

export default Dashboard;