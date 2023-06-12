/** permet d'enregistrer le token dans le localStorage en string*/
export function setToken(token) {
  token = JSON.stringify(token);
  return localStorage.setItem("token", token);
}
/** permet de recuperer le token en json */
export function check() {
  const token = localStorage.getItem("token") || "false";
  return JSON.parse(token);
}
