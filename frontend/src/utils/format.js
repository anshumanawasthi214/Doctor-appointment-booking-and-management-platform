export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function toTitleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatCurrency(value) {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(number);
}

export function getInitials(value) {
  const parts = String(value || "Doctor At Home")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  return parts.map((part) => part[0]?.toUpperCase() || "").join("") || "DH";
}

export function getFriendlyErrorMessage(error) {
  const raw = String(error?.message || "").toLowerCase();

  if (raw.includes("failed to fetch") || raw.includes("networkerror")) {
    return "We could not connect to the healthcare service right now. Please check that the server is running and try again.";
  }
  if (raw.includes("no user exists with that username")) {
    return "No account was found for that username.";
  }
  if (raw.includes("password you entered is incorrect") || raw.includes("incorrect")) {
    return "The password you entered is incorrect.";
  }
  if (raw.includes("401") || raw.includes("unauthorized") || raw.includes("bad credentials")) {
    return "The login details were not accepted. Please recheck your username and password.";
  }
  if (raw.includes("403") || raw.includes("forbidden")) {
    return "You do not have permission to perform that action in this portal.";
  }
  if (raw.includes("completed consultation")) {
    return "You can rate a doctor only after the consultation is marked as completed.";
  }
  if (raw.includes("already been submitted")) {
    return "You have already submitted a review for this appointment.";
  }
  if (raw.includes("rating must be between 1 and 5")) {
    return "Please choose a rating between 1 and 5.";
  }
  if (raw.includes("404")) {
    return "We could not find the requested healthcare information. Please refresh and try again.";
  }
  if (raw.includes("500") || raw.includes("exception")) {
    return "Something went wrong on the service side. Please try again in a moment.";
  }

  return "We could not complete that request right now. Please review the details and try again.";
}
