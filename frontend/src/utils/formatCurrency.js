export function formatCurrency(
  amount,
  currency = "USD"
) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    }).format(0);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}

export function formatCompactCurrency(
  amount,
  currency = "USD"
) {
  const numericAmount = Number(amount);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 1
  }).format(
    Number.isFinite(numericAmount) ? numericAmount : 0
  );
}

export default formatCurrency;