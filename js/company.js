function matchingWorkers(tags){
	fireRef.child('/workers/').once('value').then(function(snapshot){
		var all = snapshot.val();
		return all.keys().filter(function(x){
			workertags = Array.values(all[x].tags);
			return tags.every(function(searchtag){
				workertags.includes(searchtag);
			});
		});
	});
}
