var taginput = document.getElementById("taginput");
var fireRef = firebase.database.ref();
function addSeeker(){
	//add user to firebase
	fireRef.child("users").push().set({tags:[]});
	alert("user added");
}
