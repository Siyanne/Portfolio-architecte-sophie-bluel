import { fetchLogin } from "./api.js";
console.log(fetchLogin);
console.log("hello");
const login = await fetchLogin();
console.log(login);
const logInBtn = document.querySelector(".connexion");
const email = document.querySelector(".email");
const psw = document.querySelector(`.password`);
const msgError = document.querySelector(".errorMsg");
const loginMenu = document.querySelector(".login--link");
const logout = document.querySelector(".logout--link");
const errorElm = createAppend(msgError, ".errorMsg");
console.log(emailValue);
const userInfo = { email: email.value, password: psw.value };
logInBtn.addEventListener("click", function () {
  logIn();
});
console.log(userInfo);
console.log(login);
async function logInStorage() {
  window.localStorage.setItem("admin", JSON.stringify(login));
  console.log(login);

  const error = false;

  if (login === true) {
    window.localStorage.setItem("connected", true);
    adminConnected();
  } else {
    loginError();
  }
}
function logIn() {
  if (userInfo.email === login.email || userInfo.password !== login.password) {
    adminConnected();
  } else {
    errorElm.innerText = "“Erreur dans l’identifiant ou le mot de passe";
  }
}
function adminConnected() {
  document.location.replace("index.html");
  logoutBtn();
}
function loginError() {
  errorElm.innerHTML = "";
}
/*function userInfo() {
  const emailValue = selectorEmail.value;
  const pswValue = selectorPsw.value;
  const userInfo = { email: emailValue, password: pswValue };
  console.log(userInfo);
}
userInfo();*/

function logoutBtn() {
  login.style.display = "none";
  logout.style.display = "block";
}
/*function logout() {
  const logoutLink = document.querySelector(".logout--link");
  logoutLink.addEventListener("click", function () {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace("index.html");
  });
}*/
fetchLogin();
