import { fetchLogin } from "./api.js";

async function check() {
  const result = await fetchLogin();
  console.log(result.token);
  return result.token;
}

function setToken() {
  return window.localStorage.setItem("token", login.token);
}
function setTokens(allTokens) {
  for (let allToken of allTokens) setToken(allToken);
}
check();
setToken();
