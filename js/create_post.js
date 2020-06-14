var currentUserEmail = "";
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserEmail = user.email;
        document.getElementById('logout').style.visibility = 'visible';
    } else {
        document.getElementById('logout').style.visibility = 'hidden';
    }
});

/* Test code to add data to firestore */
//create a constant to represent the form in which data is inputted 
const form = document.querySelector('#add-test-form');

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
        userID: currentUserEmail,
    });
    form.day.value = "";
    form.time.value = "";
}, false);