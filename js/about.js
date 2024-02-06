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

	let earliestDate = tweet_array.reduce((min, tweet) => tweet.time < min.time ? tweet : min, tweet_array[0]);
    let latestDate = tweet_array.reduce((max, tweet) => tweet.time > max.time ? tweet : max, tweet_array[0]);

    document.getElementById('firstDate').innerText = earliestDate.time.toLocaleDateString('en-US');
    document.getElementById('lastDate').innerText = latestDate.time.toLocaleDateString('en-US');

    let categoriesCount = {'live_event': 0, 'achievement': 0, 'completed_event': 0, 'miscellaneous': 0};
    let writtenTextCount = 0;

    tweet_array.forEach(tweet => {
        categoriesCount[tweet.source] += 1;
        if (tweet.written && tweet.source === 'completed_event') {
            writtenTextCount += 1;
        }
    });

    let completedEvents = categoriesCount['completed_event'];
    let writtenPct = (writtenTextCount / completedEvents * 100).toFixed(2);
    document.querySelector('.written').innerText = `${writtenTextCount}`;
    document.querySelector('.writtenPct').innerText = `${writtenPct}%`;

    // Update DOM for each category count and percentage
    Object.keys(categoriesCount).forEach(category => {
        let count = categoriesCount[category];
        let pct = (count / tweet_array.length * 100).toFixed(2);
        document.querySelector(`.${category}`).innerText = `${count} tweets`;
        document.querySelector(`.${category}Pct`).innerText = `${pct}%`;
    });
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});