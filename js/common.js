var config = {
	apiKey: "AIzaSyB9ApJFEXaHkdxy2jjC8D43w9RHtw-fdWA",
	authDomain: "openpackhack.firebaseapp.com",
	databaseURL: "https://openpackhack.firebaseio.com",
	storageBucket: "openpackhack.appspot.com",
	messagingSenderId: "399670410873"
};
firebase.initializeApp(config);
var fireRef = firebase.database().ref();
var homepage = "index.html";
