class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        const text = this.text.toLowerCase();

        if (text.startsWith("just completed") || text.startsWith("just posted")) {
            return 'completed_events';
        } else if (text.startsWith("watch") && text.includes("#rklive")) {
            return 'live_events';
        } else if (text.startsWith("achieved") && text.includes("#fitnessalerts")) {
            return 'achievements';
        } else {
            return 'miscellaneous';
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        const text = this.text.toLowerCase();

        const hasAutoEnding = (text.startsWith("just completed") || text.startsWith("just posted")) && (text.includes("check it out!") || text.includes("#rklive"));
        if (hasAutoEnding) {
            return false;
        }
        return true;
    }

    get writtenText():string {
        //TODO: parse the written text from the tweet
        if (this.written) {
            const possibleEndings = ["check it out!", "#rklive"];
            let userTextStart = this.text.length;

            for (const ending of possibleEndings) {
                const index = this.text.indexOf(ending);
                if (index !== -1) {
                    userTextStart = Math.min(userTextStart, index + ending.length + 1);
                }
            }
            return userTextStart < this.text.length ? this.text.substring(userTextStart).trim() : "No user-written text identified.";
        }
        return "";
    }

    get activityType():string {
        //TODO: parse the activity type from the text of the tweet
        if (this.source !== 'completed_event') {
            return "unknown";
        }
        const activityKeywords = ["run", "walk", "swim", "hike", "bike", "yoga", "ski", "elliptical", "spinning"];
        for (const keyword of activityKeywords) {
            if (this.text.toLowerCase().includes(keyword)) {
                return keyword;
            }
        }
    
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        const distancePattern = /(\d+(\.\d+)?)\s?(mi|km)/;
        const match = this.text.match(distancePattern);

        if (match) {
            let distance = parseFloat(match[1]);
            const unit = match[3];

            if (unit === 'km') {
                distance *= 0.621371;
            }
            return distance;
        }

        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        // Construct table row; adjust based on required fields
        return `<tr>
                </tr>`;
    }
}