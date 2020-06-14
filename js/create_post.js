var user = firebase.auth().currentUser;

if(user){
    console.log("user signed in!!!");
}

/* Test code to add data to firestore */
//create a constant to represent the form in which data is inputted 
const form = document.querySelector('#add-test-form');

//listen for a submit event when the user clicks "submit" on the form
form.addEventListener('submit', function(e) {
    uploadFile();
    e.preventDefault(); //prevents page from refreshing
    db.collection('test').add({ //adds info to firestore
        day: form.day.value, //we use this structor for each variable. Separate each catagory with a ","
        time: form.time.value,
    });
    form.day.value = "";
    form.time.value = "";
}, false);