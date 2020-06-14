
// Initialize firebase variables
firebaseConfig = {
	apiKey: "AIzaSyDAquTNfqjwa8bMBSzmyO_sEaeKhhq0rWQ",
	authDomain: "dis-covid.firebaseapp.com",
	databaseURL: "https://dis-covid.firebaseio.com",
	projectId: "dis-covid",
	storageBucket: "dis-covid.appspot.com",
	messagingSenderId: "93140684291",
	appId: "1:93140684291:web:b740d37d012982f706c836",
	measurementId: "G-ZNYK27S4Z4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize database
const db = firebase.firestore();

//Initializes authentication
const auth = firebase.auth();