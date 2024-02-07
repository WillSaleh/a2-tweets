function prepareActivityData(tweetArray) {
    let activitiesByDay = tweetArray.reduce((acc, tweet) => {
        const day = tweet.time.getDay(); 
        const activity = tweet.activityType;
        const distance = tweet.distance;
        if (activity && activity !== "unknown" && distance > 0) {
            if (!acc[activity]) acc[activity] = {};
            if (!acc[activity][day]) acc[activity][day] = [];
            acc[activity][day].push(distance);
        }
        return acc;
    }, {});

	const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let activityData = [];
    Object.entries(activitiesByDay).forEach(([activity, days]) => {
        Object.entries(days).forEach(([dayNumber, distances]) => {
            distances.forEach(distance => {
                activityData.push({
                    day: dayNames[parseInt(dayNumber, 10)],
                    distance,
                    activityType: activity
                });
            });
        });
    });

    return activityData;
}

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	let activityCounts = tweet_array.reduce((acc, tweet) => {
		const activityType = tweet.activityType;
		acc[activityType] = (acc[activityType] || 0) + 1;
		return acc;
	}, {});

	let dataForVegaLite = Object.entries(activityCounts).map(([activity, count]) => ({
		activityType: activity,
		count
	}));

	let activityData = prepareActivityData(tweet_array);

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A bar chart that shows the count of each activity type.",
	  "data": {
	    "values": dataForVegaLite
	  },
	  "mark": "bar",
	  "encoding": {
		"x": {
			"field": "activityType", 
			"type": "nominal", 
			axis: {title: 'Activity Type'}
		},
		"y": {
			"field": "count", 
			"type": "quantitative", 
			axis: {title: 'Count'}
		}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
};

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});

//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.	