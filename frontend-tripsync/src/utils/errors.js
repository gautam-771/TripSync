export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.detail) return data.detail;
  if (data?.message) return data.message;
  if (data?.errors) return Object.values(data.errors).join(", ");
  return fallback;
}
