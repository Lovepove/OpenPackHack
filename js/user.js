var taginput = document.getElementById("taginput");
function addWorker(){
	//add user to firebase
	fireRef.child("workers").push({tags:taginput.value.split(',')});
	alert("good luck");
	taginput.value = "";
}
