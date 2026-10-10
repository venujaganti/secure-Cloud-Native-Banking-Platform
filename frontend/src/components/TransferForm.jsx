import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";

function TransferForm({ onSubmit }) {
  const [form, setForm] = useState({
    fromAccount: "",
    beneficiary: "",
    amount: "",
    description: ""
  });

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.fromAccount || !form.beneficiary || !form.amount) {
      return;
    }

    onSubmit?.(form);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 13px",
    border: "1px solid #dbe1ea",
    borderRadius: "9px",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box"
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "24px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "22px"
        }}
      >
        <Send size={21} color="#2563eb" />

        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            color: "#111827"
          }}
        >
          Transfer Money
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gap: "17px"
        }}
      >
        <label>
          <div className="form-label">From Account</div>

          <select
            name="fromAccount"
            value={form.fromAccount}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select account</option>
            <option value="checking">Primary Checking</option>
            <option value="savings">Savings Account</option>
          </select>
        </label>

        <label>
          <div className="form-label">Beneficiary</div>

          <select
            name="beneficiary"
            value={form.beneficiary}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select beneficiary</option>
            <option value="john">John Smith</option>
            <option value="alice">Alice Johnson</option>
          </select>
        </label>

        <label>
          <div className="form-label">Amount</div>

          <input
            type="number"
            min="0"
            step="0.01"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            style={inputStyle}
          />
        </label>

        <label>
          <div className="form-label">Description</div>

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Transfer description"
            style={inputStyle}
          />
        </label>

        <button
          type="submit"
          style={{
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            borderRadius: "9px",
            padding: "13px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          Send Transfer
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}

export default TransferForm;