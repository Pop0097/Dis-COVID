/* Test code to get and display data from firestore */
//element in index.html that is present onload
const testList = document.querySelector('#test-list');

//create element and render test
function renderTest(doc){
    //create elements in which data will be displayed
    let li = document.createElement('li');
    let day = document.createElement('span');
    let time = document.createElement('span');
    let cross = document.createElement('div');
   
    li.setAttribute('data-id', doc.id); //first parameter is attribute name, id property is second parameter (we use document id in firestore for this)
    
    //set text content of each span attribute
    day.textContent = doc.data().day;
    time.textContent = doc.data().time;
    
    li.appendChild(day);
    li.appendChild(time);
    //if(doc.data().day == "wednesday"){ //test for only specific elements (for example posts made by one user)
        cross.textContent = 'x';
        li.appendChild(cross); 
    //}
    
    //append new created list to the element that is present in index.html onload
    testList.appendChild(li);

    //deleting data
    //if(doc.data().day == "wednesday"){ //test for only specific elements (for example posts made by one user)
        cross.addEventListener('click', function(e) {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id'); //get the document doc.id from this 
            db.collection('test').doc(id).delete(); //find desired document with id found in line above. .delete() deletes document from database
        }, false);
    //}
}


//get data from firestore
//.where('day', '==', 'Monday') --> .where() is used for queries (first parameter is field. second parameter is operation. third paraeter is value)
db.collection('test').orderBy('time').get().then((snapshot)=>{ //get() returns a promise, so we need to use .then(). 
    snapshot.docs.forEach(doc => {
    //console.log(doc.data()); //doc.data() used to view specific data
    renderTest(doc); 
    })
})

/* Test code to add data to firestore */
//create a constant to represent the form in which data is inputted 
const form = document.querySelector('#add-test-form');

//listen for a submit event when the user clicks "submit" on the form
form.addEventListener('submit', function(e) {
    e.preventDefault(); //prevents page from refreshing
    db.collection('test').add({ //adds info to firestore
        day: form.day.value, //we use this structor for each variable. Separate each catagory with a ","
        time: form.time.value
    });
    form.day.value = "";
    form.time.value = "";
}, false);
