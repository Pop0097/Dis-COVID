var currentUsername= "";
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUsername = user.displayName;
        document.getElementById('logout').style.visibility = 'visible';
    } else {
        document.getElementById('logout').style.visibility = 'hidden';
    }
});

/* Test code to add data to firestore */
//create a constant to represent the form in which data is inputted 
const form = document.querySelector('#add-post-form');

//listen for a submit event when the user clicks "submit" on the form
form.addEventListener('submit', function(e) {
    //uploadFile();
    e.preventDefault(); //prevents page from refreshing
    var tagOne = form.tag1.value;
    var tagTwo = form.tag2.value;
    var tagThree = form.tag3.value;
    alert(tagOne, " ", tagTwo, " ", tagThree);
    firebase.firestore().collection('test').add({ //adds info to firestore
        day: form.day.value, //we use this structor for each variable. Separate each catagory with a ","
        time: form.time.value,
        tag1: tagOne,
        tag2: tagTwo,
        tag3: tagThree,
        username: currentUsername,
    });
    form.day.value = "";
    form.time.value = "";
}, false);

function uploadImage(e) {
    // Gets file
    var file = e.target.files[0];
    // Creates a storage reference ('folder_name/file_name' is how it's stored)
    var storageRef = firebase.storage().ref('images/' + currentUserEmail + '/' + file.name);
    // Upload file
    var myUrl = "";
    storageRef.getDownloadURL().then(function(url) {
      // Insert url into an <img> tag to "download"
      console.log(url);
      console.log("Yasss");
      firebase.firestore().collection('posts').add({
        user: currentUserEmail,
        img_url: url,
      });
    });

    var task = storageRef.put(file);
}