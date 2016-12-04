taginput = document.getElementById('taginput');
matchcount = document.getElementById('matchcount');
emails = document.getElementById('emails');
function updateMatching(){
	tags = taginput.value.split(',').map((s)=>s.trim());
	fireRef.child('/workers/').once('value').then(function(snapshot){
		var all = snapshot.val();
		matches = Object.keys(all).filter(function(x){
			workertags = Object.values(all[x].tags);
			return tags.every(function(searchtag){
				return workertags.includes(searchtag);
			});
		});
		var parsemail = matches.map(function(x){
			return all[x].email;
		}).join(";");
		matchcount.innerHTML = matches.length + " people have all the skills your searched for.";
		emails.innerHTML = "<a href='mailto:" + parsemail + "?subject=We want you!' class=\"btn btn-lg btn-primary\"><font size=\"5\">Send mail</font></a>";
	});
}
