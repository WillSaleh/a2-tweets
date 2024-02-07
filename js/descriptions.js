let filteredTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	filteredTweets = runkeeper_tweets.filter(tweet => 
        !tweet.text.toLowerCase().includes("check it out!") && !tweet.text.toLowerCase().includes("#rklive")
    );
}


function addEventHandlerForSearch() {
    const textFilter = document.getElementById('textFilter');
    const searchTextSpan = document.getElementById('searchText');
    const searchCountSpan = document.getElementById('searchCount');
    const tweetTableBody = document.getElementById('tweetTable');

    textFilter.addEventListener('input', function() {
        const searchText = this.value.toLowerCase(); 
        searchTextSpan.textContent = searchText;
        tweetTableBody.innerHTML = ''; 

   
        let searchResultTweets = [];

        if (searchText.trim() !== '') {
            searchResultTweets = filteredTweets.filter(tweet =>
                tweet.text.toLowerCase().includes(searchText)); 

            searchCountSpan.textContent = searchResultTweets.length.toString();
        } else {
            searchTextSpan.textContent = '???';
            searchCountSpan.textContent = '???';
        }

        searchResultTweets.forEach((tweet, index) => {
            const row = tweetTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);

            cell1.textContent = index + 1;
            cell2.textContent = tweet.activityType; 
            cell3.innerHTML = tweet.text; 
        });
    });
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});