export function sanitizeText(value) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim();
}

export function maskAccountNumber(accountNumber) {
  const value = String(accountNumber ?? "");

  if (value.length <= 4) {
    return value;
  }

  return `•••• ${value.slice(-4)}`;
}

export function maskEmail(email) {
  const value = String(email ?? "");
  const [username, domain] = value.split("@");

  if (!username || !domain) {
    return value;
  }

  if (username.length <= 2) {
    return `${username[0] ?? "*"}***@${domain}`;
  }

  return `${username[0]}***${username.at(-1)}@${domain}`;
}

export function isSecureContext() {
  return (
    window.isSecureContext ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

export function getSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
}