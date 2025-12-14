function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);

  localStorage.setItem("user", JSON.stringify(data));

  document.querySelector(".g_id_signin").style.display = "none";
  document.getElementById("user-info").classList.remove("hidden");

  document.getElementById("user-name").innerText = data.name;
  document.getElementById("user-pic").src = data.picture;
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

  return JSON.parse(jsonPayload);
}

// Auto login jika sudah login
window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.querySelector(".g_id_signin").style.display = "none";
    document.getElementById("user-info").classList.remove("hidden");
    document.getElementById("user-name").innerText = user.name;
    document.getElementById("user-pic").src = user.picture;
  }
};
