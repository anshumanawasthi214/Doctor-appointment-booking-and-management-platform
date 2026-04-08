const DEFAULT_BASE_URL = "http://localhost:8081/HelpMe";

function requestHeaders({ token, isFormData }) {
  const headers = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    let errorMessage = "Something went wrong while contacting the API.";

    if (contentType.includes("application/json")) {
      const errorBody = await response.json();
      errorMessage = errorBody.message || errorBody.error || JSON.stringify(errorBody);
    } else {
      errorMessage = await response.text();
    }

    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiRequest(path, { method = "GET", body, token, query } = {}) {
  const url = new URL(`${DEFAULT_BASE_URL}${path}`);
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    method,
    headers: requestHeaders({ token, isFormData }),
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
  });

  return parseResponse(response);
}

export { DEFAULT_BASE_URL };
