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