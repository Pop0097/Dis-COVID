// logout
const logout = document.getElementById('logout');
logout.addEventListener('click', function (e) {
  e.preventDefault();
  firebase.auth().signOut().then(function () {
    console.log("logout successful");
    window.location.replace("index.html");
  }).catch(function (error) {
    console.log("logout unsuccessful!");
  });
}, false);