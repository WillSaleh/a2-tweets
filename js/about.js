//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});

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

	if (tweet_array.length > 0) {
        tweet_array.sort((a, b) => a.time - b.time);

        let earliestTweet = tweet_array[0];
        let latestTweet = tweet_array[tweet_array.length - 1];

        let earliestTweetDate = earliestTweet.time.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        let latestTweetDate = latestTweet.time.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        document.getElementById('firstDate').innerText = earliestTweetDate;
        document.getElementById('lastDate').innerText = latestTweetDate;
    }

	let counters = {
		completedEvents: 0,
		liveEvents: 0,
		achievements: 0,
		miscellaneous: 0,
		written: 0
	};

	tweet_array.forEach(tweet => {
		counters[tweet.source]++;
		if (tweet.source === 'completedEvents' && tweet.written) counters.written++;
	});


	document.querySelectorAll('.completedEvents').forEach(element => element.textContent = counters.completedEvents);
    document.querySelector('.liveEvents').textContent = counters.liveEvents;
    document.querySelector('.achievements').textContent = counters.achievements;
    document.querySelector('.miscellaneous').textContent = counters.miscellaneous;

	let totalTweets = tweet_array.length;
    document.querySelector('.completedEventsPct').textContent = ((counters.completedEvents / totalTweets) * 100).toFixed(2) + '%';
    document.querySelector('.liveEventsPct').textContent = ((counters.liveEvents / totalTweets) * 100).toFixed(2) + '%';
    document.querySelector('.achievementsPct').textContent = ((counters.achievements / totalTweets) * 100).toFixed(2) + '%';
    document.querySelector('.miscellaneousPct').textContent = ((counters.miscellaneous / totalTweets) * 100).toFixed(2) + '%';
    

	let completedWithTextPct = (counters.written / counters.completedEvents) * 100;
    document.querySelector('.written').textContent = counters.written;
    document.querySelector('.writtenPct').textContent = completedWithTextPct.toFixed(2) + '%';
}

