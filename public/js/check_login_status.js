
/* Check to see if user is logged in 
 * If not, redirect user to login page */
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		console.log('Not redirecting');
	} else { 
		console.log('Redirecting to index.html');
		window.location.replace("index.html");
	}
});