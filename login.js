/** @format */

const handleLogin = (event) => {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const info = {
    username,
    password,
  };

  console.log("login", info);

  fetch("https://test-thto.onrender.com/patient/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
