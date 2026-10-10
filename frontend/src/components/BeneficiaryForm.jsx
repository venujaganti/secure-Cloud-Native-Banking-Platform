import { useState } from "react";
import { UserPlus } from "lucide-react";

function BeneficiaryForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    accountNumber: "",
    bankName: "",
    ifsc: ""
  });

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.accountNumber ||
      !form.bankName ||
      !form.ifsc
    ) {
      return;
    }

    onSubmit?.(form);
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #dbe1ea",
    borderRadius: "8px",
    fontSize: "14px"
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        padding: "22px",
        borderRadius: "16px",
        border: "1px solid #e5e7eb"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "9px",
          marginBottom: "18px"
        }}
      >
        <UserPlus size={20} color="#2563eb" />

        <h2
          style={{
            margin: 0,
            fontSize: "18px"
          }}
        >
          Add Beneficiary
        </h2>
      </div>

      <div style={{ display: "grid", gap: "14px" }}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Beneficiary name"
          style={inputStyle}
        />

        <input
          name="accountNumber"
          value={form.accountNumber}
          onChange={handleChange}
          placeholder="Account number"
          inputMode="numeric"
          style={inputStyle}
        />

        <input
          name="bankName"
          value={form.bankName}
          onChange={handleChange}
          placeholder="Bank name"
          style={inputStyle}
        />

        <input
          name="ifsc"
          value={form.ifsc}
          onChange={handleChange}
          placeholder="Routing / IFSC code"
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            border: "none",
            background: "#111827",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "12px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Add Beneficiary
        </button>
      </div>
    </form>
  );
}

export default BeneficiaryForm;