var taginput = document.getElementById("taginput");
var fireRef = firebase.database().ref();
function addSeeker(){
	//add user to firebase
	fireRef.child("users").push({tags:taginput.value.split(',')});
	alert("user added");
	taginput.value = "";
}
