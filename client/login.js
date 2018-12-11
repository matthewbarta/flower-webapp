firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    // User is signed in.
    document.getElementById("in_div").style.display = "none";
    document.getElementById("out_div").style.display = "initial";

    var user = firebase.auth().currentUser;

    //Dislay the name of the user logged in.
    if(user != null) {

      var email_id = user.email;
      var email = email_id.split('@');

	  document.getElementById("user_id").innerHTML = "Logged in as: " + email[0];
    }

} else {
    // No user is signed in.
    document.getElementById("in_div").style.display = "initial";
	document.getElementById("out_div").style.display = "none";
}
});

function login() {

	var email = document.getElementById("email_field").value;
	var password = document.getElementById("password_field").value;

	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		document.location.href = "index.html";
	}).catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	window.alert("Error : " + errorMessage);
	});
}

function logout() {
	firebase.auth().signOut().then(function() {
  		// Sign-out successful.
  		document.location.href = "index.html";
  	}).catch(function(error) {
  		// An error happened.
  		var errorMessage = error.message;
  		window.alert("Error : " + errorMessage);
  	});

  }

  function createAccount() {

  	var email = document.getElementById("new_email_field").value;
  	var password = document.getElementById("new_password_field").value;

  	var indexOfAt = email.indexOf('@ufl.edu');
  	if(indexOfAt == -1) {
  		window.alert("Error : the email address used must be a UFL email (@ufl.edu)");
  		return;
  	}

  	firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
  		document.location.href = "index.html";
  	}).catch(function(error) {
  		// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
 		 // ...
 	 window.alert("Error : " + errorMessage);
	});
  }