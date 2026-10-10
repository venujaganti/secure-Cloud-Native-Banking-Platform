import { useState } from "react";
import BeneficiaryForm from "../components/BeneficiaryForm";
import SecurityAlert from "../components/SecurityAlert";

function Beneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([
    {
      id: 1,
      name: "John Smith",
      account: "•••• 3921",
      bank: "Secure National Bank"
    },
    {
      id: 2,
      name: "Alice Johnson",
      account: "•••• 8842",
      bank: "Global Trust Bank"
    }
  ]);

  const [message, setMessage] = useState("");

  const handleAdd = (form) => {
    setBeneficiaries((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: form.name,
        account: `•••• ${form.accountNumber.slice(-4)}`,
        bank: form.bankName
      }
    ]);

    setMessage("Beneficiary added successfully.");
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Beneficiaries</h1>

      <p style={{ color: "#64748b" }}>
        Manage approved recipients for secure transfers.
      </p>

      {message && (
        <div style={{ margin: "20px 0" }}>
          <SecurityAlert
            type="success"
            title="Beneficiary Added"
            message={message}
          />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1fr) minmax(280px, 1fr)",
          gap: "20px",
          marginTop: "24px"
        }}
      >
        <BeneficiaryForm onSubmit={handleAdd} />

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "16px",
            padding: "22px"
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: "18px"
            }}
          >
            Saved Beneficiaries
          </h2>

          <div style={{ display: "grid", gap: "12px" }}>
            {beneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                style={{
                  padding: "14px",
                  border: "1px solid #eef2f7",
                  borderRadius: "10px"
                }}
              >
                <div
                  style={{
                    fontWeight: "700",
                    color: "#111827"
                  }}
                >
                  {beneficiary.name}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    color: "#64748b"
                  }}
                >
                  {beneficiary.bank} • {beneficiary.account}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Beneficiaries;