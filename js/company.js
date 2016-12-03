taginput = document.getElementById('taginput');
matchcount = document.getElementById('matchcount');
emails = document.getElementById('emails');
function updateMatching(){
	tags = taginput.value.split(',');
	fireRef.child('/workers/').once('value').then(function(snapshot){
		var all = snapshot.val();
		matches = Object.keys(all).filter(function(x){
			workertags = Object.values(all[x].tags);
			return tags.every(function(searchtag){
				return workertags.includes(searchtag);
			});
		});
		var parsemail = matches.join(";");
		matchcount.innerHTML = "Antal matchade: " + matches.length;
		emails.innerHTML = "<a href='mailto:" + parsemail + "?subject=We want you!' class=\"btn btn-lg btn-primary\"><font size=\"5\">Send mail</font></a>";
	});
}
