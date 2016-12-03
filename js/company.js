function matchingWorkers(tags){
	fireRef.once('/workers/').once('value').then(function(snapshot){
		return snapshot.map()
	});
}
