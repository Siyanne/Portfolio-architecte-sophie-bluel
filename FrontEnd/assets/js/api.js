import { check } from "./auth.js";

const link = "http://localhost:5678";

export async function apiFetch(method, url, body, options = {}) {
  const headers = { ...options.headers };

  // Gestion de l'authentification
  const token = check();
  if (token) headers.Authorization = `Bearer ${token}`;

  // Gestion du body
  if (body instanceof FormData) {
  } else if (typeof body === "object") {
    body = JSON.stringify(body);
    headers["Content-Type"] = "application/json";
  }

  console.log(`${method} ${url}`);

  // Appel a fetch
  const response = await fetch(`${link}${url}`, {
    ...options,
    method,
    body,
    headers,
  });

  // Gestion de la réponse
  let data = await response.text();
  try {
    data = JSON.parse(data);
  } catch (error) {}

  console.groupCollapsed(`${method} ${url}`);

  console.log("headers", headers);
  console.log("body", body);
  console.log("response", response);
  console.log("data", data);
  console.groupEnd();

  return data;
}

export const fetchWorks = () => apiFetch("GET", `/api/works`);
export const fetchCategories = () => apiFetch("GET", `/api/categories`);
export const fetchLogin = (body) => apiFetch("POST", "/api/users/login", body);
