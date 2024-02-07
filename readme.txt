--Readme document for *author*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

*/20
- 2/2 Tweet dates
- 3/3 Tweet categories
- 3/3 User-written tweets
- */3 Determining activity type and distance
- */3 Graphing activities by distance
- */3 Implementing the search box
- */3 Populating the table

2. How long, in hours, did it take you to complete this assignment?



3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials, etc.)



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
No one


5. Is there anything special we need to know in order to run your code?
Nope

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
