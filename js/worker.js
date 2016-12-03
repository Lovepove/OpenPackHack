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

function loadUsersTags(username){
	var currTagsParagraph = document.getElementById("currentTags").getElementsByTagName("p")[0];

	var tags = fireRef.child('workers/' + username + "/tags");
	tags.once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var tagData = childSnapshot.val();
			var btn = document.createElement("button");
			btn.type = "button"
			btn.className = "btn btn-default";
			btn.innerText = tagData;
			currTagsParagraph.appendChild(btn);
		});
	});
}

var defUser = "-KY459HQWUPqLRU6Soim";
loadUsersTags(defUser);