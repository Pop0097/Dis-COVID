var currentUserEmail = "";
var post_counter = -1;
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserEmail = user.email;
        document.getElementById('logout').style.visibility = 'visible';
    } else {
        document.getElementById('logout').style.visibility = 'hidden';
    }
});

firebase.firestore().collection('users').doc(currentUserEmail).get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
            post_counter = doc.data().post_counter;
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
});

/* Test code to add data to firestore */
//create a constant to represent the form in which data is inputted 
const form = document.querySelector('#add-post-form');

//listen for a submit event when the user clicks "submit" on the form
form.addEventListener('submit', function(e) {
    e.preventDefault(); //prevents page from refreshing

    var tagOne = form.tag1.value;
    var tagTwo = form.tag2.value;
    var tagThree = form.tag3.value;

    var subj = form.subject.value;
    var msg = form.message.value;
    
    firebase.firestore().collection('posts').doc(currentUserEmail + "." + post_counter).set({
        tag1: tagOne,
        tag2: tagTwo,
        tag3: tagThree,
        subject: subj,
        message: msg,
    }, {merge: true});

    console.log("submited");

    post_counter++;
    firebase.firestore().collection('users').doc(currentUserEmail).set({
        post_counter: post_counter,
    });
}, false);

// Elements for file 
var fileButton = document.getElementById('fileButton');

// Listens for file selection
fileButton.addEventListener('change', function(e) {
    // Gets file
    var file = e.target.files[0];
    // Creates a storage reference ('folder_name/file_name' is how it's stored)
    var storageRef = firebase.storage().ref('images/' + currentUserEmail + '/' + file.name);
    // Upload file
    var myUrl = "";
    storageRef.getDownloadURL().then(function(url) {
        // Insert url into an <img> tag to "download"
        firebase.firestore().collection('posts').doc(currentUserEmail + "." + post_counter).set({
            user: currentUserEmail,
            img_url: url,
            tag1: null,
            tag2: null,
            tag3: null,
            subject: null,
            message: null,
        }, {merge: true});
    });

    var task = storageRef.put(file);

    console.log("image uploaded");
});