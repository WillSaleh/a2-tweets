function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	//Sort tweets by date
	tweet_array.sort(function(a, b) {
        return new Date(a.time) - new Date(b.time);
    });

	var earliestTweetDate = new Date(tweet_array[0].time).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    var latestTweetDate = new Date(tweet_array[tweet_array.length - 1].time).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

	//Update the dates in the html
	document.getElementById('firstDate').innerText = earliestTweetDate;
    document.getElementById('lastDate').innerText = latestTweetDate;

	let completedEvents = 0, liveEvents = 0, achievements = 0, miscellaneous = 0, written = 0;

	tweet_array.forEach(tweet => {
		if (tweet.isCompletedEvent()) completedEvents++;
		if (tweet.isLiveEvent()) liveEvents++;
		if (tweet.isAchievement()) achievements++;
		if (tweet.isMisceallaneous()) miscellaneous++;
		if (tweet.isWritten()) written++;
	});
	
	let totalTweets = tweet_array.length;
	let completedEventsPct = (completedEvents / totalTweets) * 100;
	let liveEventsPct = (liveEvents / totalTweets) * 100;
	let achievementsPct = (achievements / totalTweets) * 100;
	let miscellaneousPct = (miscellaneous / totalTweets) * 100;
	let writtenPct = (written / completedEvents) * 100;

	document.querySelector('.completedEvents').innerText = completedEvents;
	document.querySelector('.completedEventsPct').innerText = completedEventsPct.toFixed(2) + '%';
	document.querySelector('.liveEvents').innerText = liveEvents;
	document.querySelector('.liveEventsPct').innerText = liveEventsPct.toFixed(2) + '%';
	document.querySelector('.achievements').innerText = achievements;
	document.querySelector('.achievementsPct').innerText = achievementsPct.toFixed(2) + '%';
	document.querySelector('.miscellaneous').innerText = miscellaneous;
	document.querySelector('.miscellaneousPct').innerText = miscellaneousPct.toFixed(2) + '%';
	document.querySelector('.written').innerText = written;
	document.querySelector('.writtenPct').innerText = writtenPct.toFixed(2) + '%';
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});