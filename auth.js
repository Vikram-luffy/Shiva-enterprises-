// DEMO-ONLY login. Credentials are intentionally visible in this local template.
// For a real online/private system, authentication must be handled server-side.

const DEMO_USERNAME = "shiva";
const DEMO_PASSWORD = "shiva1234";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const message = document.getElementById("loginMessage");

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    sessionStorage.setItem("shivaLoggedIn", "true");
    window.location.href = "app.html";
  } else {
    message.textContent = "Incorrect username or password.";
  }
});
