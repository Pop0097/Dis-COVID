
  
  // logout
  const logout = document.getElementById('logout');
  logout.addEventListener('submit', function(e){
    console.log("logout is working");
    e.preventDefault();
    auth.signOut();
  }, false);
  
  