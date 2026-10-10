export function isRequired(value) {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim().length > 0
  );
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email).trim()
  );
}

export function isStrongPassword(password) {
  const value = String(password);

  return (
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  );
}

export function isValidAmount(amount) {
  const value = Number(amount);

  return Number.isFinite(value) && value > 0;
}

export function validateTransfer(data) {
  const errors = {};

  if (!isRequired(data.fromAccount)) {
    errors.fromAccount = "Source account is required.";
  }

  if (!isRequired(data.beneficiary)) {
    errors.beneficiary = "Beneficiary is required.";
  }

  if (!isValidAmount(data.amount)) {
    errors.amount = "Enter a valid transfer amount.";
  }

  return errors;
}