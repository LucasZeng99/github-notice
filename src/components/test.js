function normalizeActivities (activities) {
    let finalActivities = {}
    console.log(activities)
    for (let name of Object.keys(activities)) {
      let events = activities[name]
  
      let newEvents = []
      let newEvent = {
        type: '',
        repo: {},
        count: 0
      }
  
      let i = 0
      while (i < events.length) {
        let event = events[i]
        if (newEvent && newEvent.type === event.type && newEvent.repo === event.repo) {
          newEvent.count += event.payload.size || 1
        }
        else {
          if (Boolean(newEvent.type)) newEvents.push(newEvent)
          newEvent = {
            type: event.type,
            repo: event.repo,
            count: event.payload.size || 1
          }
        }
        i++
      }
  
      if (!!newEvent.type) newEvents.push(newEvent)
      
      finalActivities[name] = newEvents
    }
    return finalActivities
  }

let obj = JSON.parse(`{"lucas":[{"id":"8545862184","type":"WatchEvent","actor":{"id":1467716,"login":"lucas","display_login":"lucas","gravatar_id":"","url":"https://api.github.com/users/lucas","avatar_url":"https://avatars.githubusercontent.com/u/1467716?"},"repo":{"id":155636246,"name":"jantic/DeOldify","url":"https://api.github.com/repos/jantic/DeOldify"},"payload":{"action":"started"},"public":true,"created_at":"2018-11-06T22:02:35Z"},{"id":"8530710595","type":"WatchEvent","actor":{"id":1467716,"login":"lucas","display_login":"lucas","gravatar_id":"","url":"https://api.github.com/users/lucas","avatar_url":"https://avatars.githubusercontent.com/u/1467716?"},"repo":{"id":91469586,"name":"kairen/kubeadm-ansible","url":"https://api.github.com/repos/kairen/kubeadm-ansible"},"payload":{"action":"started"},"public":true,"created_at":"2018-11-04T02:13:07Z"},{"id":"8173319013","type":"WatchEvent","actor":{"id":1467716,"login":"lucas","display_login":"lucas","gravatar_id":"","url":"https://api.github.com/users/lucas","avatar_url":"https://avatars.githubusercontent.com/u/1467716?"},"repo":{"id":145360265,"name":"kkyon/databot","url":"https://api.github.com/repos/kkyon/databot"},"payload":{"action":"started"},"public":true,"created_at":"2018-08-27T17:19:57Z"}]}`)
console.log(normalizeActivities(obj))

