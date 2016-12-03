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
		fireRef.child("workers/" + username + "/email").set(user.email);
    // User is signed in.
	} else {
		console.log("user not signed in");
		document.body.innerText = "";
		firebase.auth().signInWithRedirect(provider);
    // No user is signed in.
  }
});


function addWorkerSkill(){
	//add user to firebase
	taginput.value.split(',').map((s)=>s.trim()).forEach(function(x){
		fireRef.child("workers/" + username + "/tags").push(x);
	});
	alert("good luck");
	taginput.value = "";
}

function addWorkerTagToPage(tag) {
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
		addWorkerTagToPage(snapshot.val());
//		snapshot.forEach(function(childSnapshot){
//			addWorkerTagToPage(childSnapshot.val());
//		});
	});
	tagsRef.on('value', function(snapshot){
		console.log("value updated, snapshot: " + snapshot);
		// snapshot.forEach(function(childSnapshot){
		// 	addWorkerTagToPage(childSnapshot.val());i
		// 	console.log("childSnapshot.val: " + childSnapshot.val);
		// });
		snapshot.forEach(function(childsnap){
			addWorkerTagToPage(childsnap.val());
		});
		var event = snapshot.val();
		// console.log("event: " + event);
		// console.log("event.key: " + event.key);
		// console.log("event.title: " + event.title);
		// console.log("event.content: " + event.content);
		addWorkerTagToPage("$$$");
	});
	tagsRef.limitToLast(1).on('child_added', function(snapshot){
		console.log(snapshot.name(), snapshot.val());
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

document.getElementById("taginput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("tagbutton").click();
    }
});

loadUsersTags(username);
