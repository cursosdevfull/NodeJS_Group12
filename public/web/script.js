const pname = document.getElementById("name");
const plastname = document.getElementById("lastname");

fetch("http://localhost:3000/user/209c22d0-3a0d-4bc8-83f5-6c3e9c895923")
  .then((res) => res.json())
  .then((response) => {
    pname.innerHTML = response.name;
    plastname.innerHTML = response.lastname;
  });
