"use strict";
// Basic client-side password screen for public GitHub Pages.
// NOT real access control: events.json and all static files remain publicly readable.
const PASSWORD_SHA256 = "b7744a2fda322e3ca271473af8e550401f2f805a85707033d01b4a18a50bb8cb";
const ACCESS_KEY = "nyscate-2026-basic-gate-v1";
const rememberDevice = document.getElementById("rememberDevice");
const gate = document.getElementById("passwordGate");
const planner = document.getElementById("plannerApp");
const form = document.getElementById("passwordForm");
const passwordInput = document.getElementById("accessPassword");
const error = document.getElementById("passwordError");
function openPlanner() {
  gate.hidden = true;
  planner.hidden = false;
  document.body.classList.remove("locked");
  const script = document.createElement("script");
  script.src = "app.js";
  document.body.appendChild(script);
}
async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, "0")).join("");
}
form.addEventListener("submit", async event => {
  event.preventDefault();
  error.textContent = "";
  try {
    if ((await digest(passwordInput.value)) !== PASSWORD_SHA256) {
      error.textContent = "Incorrect password. Please try again.";
      passwordInput.select();
      return;
    }
    if (rememberDevice.checked) {
      localStorage.setItem(ACCESS_KEY, "ok");
      sessionStorage.removeItem(ACCESS_KEY);
    } else {
      sessionStorage.setItem(ACCESS_KEY, "ok");
      localStorage.removeItem(ACCESS_KEY);
    }
    openPlanner();
  } catch (err) {
    error.textContent = "Unable to verify the password. Open this page through HTTPS.";
  }
});
if (localStorage.getItem(ACCESS_KEY) === "ok" || sessionStorage.getItem(ACCESS_KEY) === "ok") openPlanner();
else passwordInput.focus();
