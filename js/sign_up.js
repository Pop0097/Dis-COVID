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
        postActions(); 
    });
}, false);

function postActions(){
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const userName = signupForm.name.value;
            console.log(userName);

            user.updateProfile({
                displayName: userName
            }).then(function() {
                console.log("username entered!");
              }).catch(function(error) {
                console.log("username NOT entered!");
              });;
            
            user.sendEmailVerification().then(function() {
            console.log("Verification email sent!");
            }).catch(function(error) {
                console.log("Verification email NOT sent!");
            });
            signupForm.reset();
            window.location.replace("all_posts.html");
        } else {
            console.log("Post signup actions not performed");
        }
    });
}


