import RNEventSource from "react-native-event-source";

var ApiURL = "http://api.cactusmq.com/v1/";

export default class CactusMQ {
    constructor(options) {
        this.publishURL = ApiURL.concat("publish/", options.publishKey);
        this.subscribeURL = ApiURL.concat("subscribe/", options.subscribeKey);
        this.onMessage = options.onMessage;
        this.onPublish = options.onPublish;
        this.onError = options.onError;
    }

    publish(topic, message, data) {
        fetch(this.cactusPublish, {
            method: "POST",
            headers: {
                Accept: "application/json", "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: topic,
                message: message,
                data: data
            })
                .then((response) => response.json())
                .then((response) => {
                    this.onPublish(response);
                }).catch(() => {
                    this.onError(error);
            })
        });
    }
   
    subscribe(topic) {
        var eventSource = new EventSource(this.subscribeURL);
        eventSource.addEventListener(topic, event => {
            this.onMessage(event);
        }); 
    }
 }