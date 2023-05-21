export function check() {
  const token = localStorage.getItem("token") || "false";
  return JSON.parse(token);
}

export function setToken(token) {
  token = JSON.stringify(token);
  return localStorage.setItem("token", token);
}
