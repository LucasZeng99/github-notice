export function normalizeActivities(activities) {
    let finalActivities = {};
    for (let name of Object.keys(activities)) {
        let events = activities[name];

        let newEvents = [];
        let newEvent = {
            type: "",
            repo: {},
            count: 0,
            time: 0
        };

        let i = 0;
        while (i < events.length) {
            let event = events[i];
            mapEventType(event);
            mapEventRepo(event, name);
            if (
                newEvent &&
                newEvent.type === event.type &&
                newEvent.repo.name === event.repo.name
            ) {
                newEvent.count += event.payload.size || 1;
            } else {
                if (Boolean(newEvent.type)) newEvents.push(newEvent);
                newEvent = {
                    type: event.type,
                    repo: event.repo,
                    count: event.payload.size || 1,
                    time: event.created_at,
                    url: `https://github.com/${event.repo.name}`
                }
            }
            i++;
        }
        if (!!newEvent.type) newEvents.push(newEvent);

        finalActivities[name] = newEvents;
    }
    return finalActivities;
}

export function mapEventType(event) {
    switch (event.type) {
        case "PushEvent":
            event.type = "commit";
            break;
        case "IssuesEvent":
            event.type = "issue";
            break;
        case "WatchEvent":
            event.type = "star";
            break;
        case "PublicEvent":
            event.type = "public";
            break;
        case "CreateEvent":
            event.type = "new repo";
            break;
        case "MemberEvent":
            event.type = "new member";
            break;
        case "IssueCommentEvent":
            event.type = "issue comment"
            break
        case "PullRequestEvent":
            event.type = "pull request"
            break
        case "DeleteEvent":
            event.type = "deletion"
            break
        case "PullRequestReviewCommentEvent":
            event.type = "pull request comment"
            break
        default:
            break;
    }
}

export function mapEventRepo(event, name) {
    let repoOwner = event.repo.name.slice(0, event.repo.name.indexOf("/"));
    if (repoOwner === name)
        event.repo.name = event.repo.name.slice(event.repo.name.indexOf("/"));
}

export function flattenActivities(activities) {
    let newActivities = [];
    let keys = Object.keys(activities);

    for (let i = 0; i < keys.length; i++) {
        let name = keys[i];
        for (let j = 0; j < activities[name].length; j++) {
            let event = activities[name][j];
            event.user = name;
            newActivities.push(event);
        }
    }
    return newActivities;
}