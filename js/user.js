var taginput = document.getElementById("taginput");
var fireRef = firebase.database().ref();
function addWorker(){
	//add user to firebase
	fireRef.child("workers").push({tags:taginput.value.split(',')});
	alert("good luck");
	taginput.value = "";
}
