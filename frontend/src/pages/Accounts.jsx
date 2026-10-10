import AccountCard from "../components/AccountCard";

function Accounts() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>My Accounts</h1>

      <p style={{ color: "#64748b" }}>
        Manage and review your banking accounts.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "25px"
        }}
      >
        <AccountCard
          accountName="Primary Checking"
          accountNumber="•••• 4821"
          balance={24580.75}
          type="Checking"
        />

        <AccountCard
          accountName="Savings Account"
          accountNumber="•••• 7319"
          balance={38750.2}
          type="Savings"
        />
      </div>
    </div>
  );
}

export default Accounts;