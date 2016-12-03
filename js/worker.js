var provider = new firebase.auth.GoogleAuthProvider();
var username = "";
var currTagsParagraph = document.getElementById("currentTags").getElementsByTagName("p")[0];


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    	username = user.uid;
    	console.log("UID: " + username);
		var header = document.getElementById("greeting");
		header.innerHTML = "Hello, " + user.displayName + ". Let's find you a job today.";
    // User is signed in.
	} else {
		console.log("user not signed in");
		document.body.innerText = "";
		firebase.auth().signInWithRedirect(provider);
    // No user is signed in.
  }
});



var taginput = document.getElementById("taginput");
var fireRef = firebase.database().ref();

function addWorkerSkill() {
	//fireRef.child("workers/" + username + "/tags").push({});
}

function addWorker(){
	//add user to firebase
	fireRef.child("workers").push({tags:taginput.value.split(',')});
	alert("good luck");
	taginput.value = "";
}

function addWorkerTag(tag) {
	var btn = document.createElement("button");
	btn.type = "button"
	btn.className = "btn btn-default";
	btn.innerText = tag;
	currTagsParagraph.appendChild(btn);

}

function loadUsersTags(username){
	var currTagsParagraph = document.getElementById("currentTags").getElementsByTagName("p")[0];

	var tagsRef = fireRef.child('workers/' + username + "/tags");
	tagsRef.once('value', function(snapshot){
		snapshot.forEach(function(childSnapshot){
			addWorkerTag(childSnapshot.val());
		});
	});
	tagsRef.on('child_added', function(snapshot){
		var event = snapshot.val();
		console.log("event: " + event);
		console.log("event.key: " + event.key);
		console.log("event.title: " + event.title);
		console.log("event.content: " + event.content);
		addWorkerTag("$$$")
	});
}

loadUsersTags(username);