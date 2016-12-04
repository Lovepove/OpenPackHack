var provider = new firebase.auth.GoogleAuthProvider();
var username = "";
var currTagsParagraph = document.getElementById("currentTags").getElementsByTagName("p")[0];
var taginput = document.getElementById("taginput");
var fireRef = firebase.database().ref();

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		username = user.uid;
		console.log("UID: " + username);
		var header = document.getElementById("greeting");
		header.innerHTML = "Hello, " + user.displayName + ". Let's find you a job today.";
		document.getElementById("taginput").addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode == 13) {
				addWorkerSkill();
			}
		});
		loadUsersTags(username);
		fireRef.child("workers/" + username + "/email").set(user.email);
	} else {
		console.log("user not signed in");
		firebase.auth().signInWithRedirect(provider);
	}
});


function addWorkerSkill(){
	//add user to firebase
	taginput.value.split(',').forEach(function(x){
		fireRef.child("workers/" + username + "/tags").push(x.trim());
	});
	taginput.value = "";
}

function addWorkerTagToPage(tag) {
	var btn = document.createElement("button");
	btn.type = "button"
	btn.className = "btn btn-primary";
	btn.innerText = tag;
	currTagsParagraph.appendChild(btn);

}

function loadUsersTags(username){
	var tagsRef = fireRef.child('workers/' + username + "/tags");
	tagsRef.on('child_added', function(snapshot,prevChildKey){
		addWorkerTagToPage(snapshot.val());
	});
}

function logOut() {
	firebase.auth().signOut().then(function() {
		console.log("Logout successful")
		document.location = homepage;
	}, function() {
		console.log("Logout failed")
	})
}
