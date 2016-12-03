var provider = new firebase.auth.GoogleAuthProvider();


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var header = document.getElementById("greeting");
		header.innerHTML = "Hello, " + user.displayName + ". Let's find you a job today.";
    // User is signed in.
	} else {
		firebase.auth().signInWithRedirect(provider);
    // No user is signed in.
  }
});



var taginput = document.getElementById("taginput");
var fireRef = firebase.database().ref();

function addWorker(){
	//add user to firebase
	fireRef.child("workers").push({tags:taginput.value.split(',')});
	alert("good luck");
	taginput.value = "";
}
