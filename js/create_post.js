
var currentUserEmail = "";
var currentUsername = "";
var post_counter = 0;
var timer;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserEmail = user.email;
        currentUsername = user.displayName;
        console.log(currentUserEmail, "\nuser logged in:\n", user);
        getPostDocNumber();
    }
});

function getPostDocNumber() {
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
    console.log("successfully got post number");
}

// Listens for file selection
document.getElementById('fileButton').addEventListener('change', function(e) {
    // Gets file
    var file = e.target.files[0];
    // Creates a storage reference ('folder_name/file_name' is how it's stored)
    //var storageRef = firebase.storage().ref();
    //var imageRef = storageRef.child(file.name);
    //var userImageRef = storageRef.child(currentUserEmail + "/" + file.name);
    var storageRef = firebase.storage().ref('images/' + currentUserEmail + '/' + post_counter);
    // Upload file
    var task = storageRef.put(file); //uploads image to storage

    console.log("image uploaded");
});

/* Test code to add data to firestore */

//listen for a submit event when the user clicks "submit" on the form
const form = document.getElementById('add-post-form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); //prevents page from refreshing

    var tagOne = form.tag1.value;
    var tagTwo = form.tag2.value;
    var tagThree = form.tag3.value;

    //if tags are identical, they are made so that they are not
    if(tagOne == tagTwo || tagTwo == tagThree) {
        tagTwo = "Default";
    }
    if(tagOne == tagThree) {
        tagThree = "Default";
    }

    var subj = form.subject.value;
    var msg = form.message.value;

    var storageRef = firebase.storage().ref('images/' + currentUserEmail + '/' + post_counter);
    storageRef.getDownloadURL().then(function(url) {
        // Insert url into an <img> tag to "download"
        //console.log(currentUserEmail + "." + post_counter);
        console.log(url);
        firebase.firestore().collection('posts').doc(currentUserEmail + "." + post_counter).set({
            user: currentUsername,
            user_email: currentUserEmail,
            img_url: url,
            tag1: tagOne,
            tag2: tagTwo,
            tag3: tagThree,
            subject: subj,
            message: msg,
            likes: 0,
            likes_users: [""],
        }, {merge: true});
    });

    console.log("submitted");

    //Increases post counter by one 
    post_counter = post_counter + 1;
    firebase.firestore().collection('users').doc(currentUserEmail).set({
        post_counter: post_counter,
    });

    //after 2 seconds, redirect the user to 
    timer = window.setTimeout(goToPosts(), 2000); 
}, false);

function goToPosts(){
    window.clearTimeout(timer);
    console.log('here');
    window.location.replace("all_posts.html"); //redirects user to home page
}