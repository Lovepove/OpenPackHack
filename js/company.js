taginput = document.getElementById('taginput');
matchcount = document.getElementById('matchcount');
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
		matchcount.innerHTML = matches.length + " matches.";
	});
}
