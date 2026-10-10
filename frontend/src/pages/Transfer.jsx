import { useState } from "react";
import TransferForm from "../components/TransferForm";
import SecurityAlert from "../components/SecurityAlert";

function Transfer() {
  const [message, setMessage] = useState("");

  const handleTransfer = (form) => {
    setMessage(
      `Transfer request for $${Number(form.amount).toFixed(
        2
      )} has been submitted for secure processing.`
    );
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Transfer Money</h1>

      <p style={{ color: "#64748b" }}>
        Send money securely to an approved beneficiary.
      </p>

      <div
        style={{
          maxWidth: "700px",
          marginTop: "24px"
        }}
      >
        {message && (
          <div style={{ marginBottom: "16px" }}>
            <SecurityAlert
              type="success"
              title="Transfer Submitted"
              message={message}
            />
          </div>
        )}

        <TransferForm onSubmit={handleTransfer} />
      </div>
    </div>
  );
}

export default Transfer;