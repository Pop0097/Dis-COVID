//get user information
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        //get user email and username
        var userEmail = user.email;
        var userUsername = user.displayName; 
        //pass email and username into function to display them
        displayUserInformation(userEmail, userUsername); 
    } else {
        console.log('user logged out');
    }
});

function displayUserInformation(userEmail, userUsername){
    console.log(userUsername, " ", userEmail);
    if(userUsername){
        document.getElementById('user-username').innerHTML = userUsername; //prints username if defined
    } else {
        document.getElementById('user-username').innerHTML = userEmail; //prints email if username is not defined

    }
    document.getElementById('user-email').innerHTML = userEmail; //prints email
}