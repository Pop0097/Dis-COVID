  // logout
  const logout = document.getElementById('logout');
  logout.addEventListener('click', function(e){
    e.preventDefault();
    firebase.auth().signOut().then(function(){
      console.log("logout successful");
    }).catch(function(error){
      console.log("logout unsuccessful!");
    });
  }, false);
  
  