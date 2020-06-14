
var currentUserEmail = "";
var post_counter = 0;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserEmail = user.email;
        console.log(currentUserEmail, "\nuser logged in:\n", user);
        document.getElementById('logout').style.visibility = 'visible';
        getPostDocNumber();
    } else {
        document.getElementById('logout').style.visibility = 'hidden';
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

    if(tagOne == tagTwo || tagTwo == tagThree) {
        form.tag2.value = "Default";
    }
    if(tagOne == tagThree) {
        form.tag3.value = "Default";
    }

    var subj = form.subject.value;
    var msg = form.message.value;

    var storageRef = firebase.storage().ref('images/' + currentUserEmail + '/' + post_counter);
    storageRef.getDownloadURL().then(function(url) {
        // Insert url into an <img> tag to "download"
        //console.log(currentUserEmail + "." + post_counter);
        console.log(url);
        firebase.firestore().collection('posts').doc(currentUserEmail + "." + post_counter).set({
            user: currentUserEmail,
            img_url: url,
            tag1: tagOne,
            tag2: tagTwo,
            tag3: tagThree,
            subject: subj,
            message: msg,
        }, {merge: true});
    });

    console.log("submitted");

    //Increases post counter by one 
    post_counter = post_counter + 1;
    firebase.firestore().collection('users').doc(currentUserEmail).set({
        post_counter: post_counter,
    });

    window.location.replace("all_posts.html"); //redirects user to home page
}, false);