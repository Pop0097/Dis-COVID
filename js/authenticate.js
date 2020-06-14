// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
    } else {
      console.log('user logged out');
    }
  })
  
  // signup
  const signupForm = document.getElementById('signup-form');
  signupForm.addEventListener('submit', function(e){
    console.log('sign up is working');
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
      signupForm.reset();
    });
  }, false);
  
  // logout
  const logout = document.getElementById('logout');
  logout.addEventListener('submit', function(e){
    console.log("logout is working");
    e.preventDefault();
    auth.signOut();
  }, false);
  
  // login
  const loginForm = document.getElementById('login-button');
  loginForm.addEventListener('click', function(e){
    console.log("login is working");
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      loginForm.reset();
    }, false).catch(function(err) {
        console.log("login did not work!");
    });
  }, false);