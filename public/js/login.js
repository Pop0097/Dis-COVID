// login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('click', function(e){
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(e){
    console.log("login is working");
    loginForm.reset();
  }, false).catch(function(err) {
      console.log("login did not work!");
  });
});


