import RNEventSource from "react-native-event-source";

var request = require("request");
var ApiURL = "http://api.cactusmq.com/v1/";

function CactusMQ(options) {
    this.publishURL = ApiURL.concat("publish/", options.publishKey);
    this.subscribeURL = ApiURL.concat("subscribe/", options.subscribeKey);
    this.onMessage = options.onMessage;
    this.onPublish = options.onPublish;
    this.onError = options.onError;
};

CactusMQ.prototype.publish = function (topic, message, data) { 
    fetch(this.publishURL, {
        method: 'POST',
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            topic: topic,
            message: message,
            data: data
        })
        .then((response) => response.json())
        .then((response) => {
            this.onPublish(response);
        })
        .catch((error) => {
            this.onError(error);
        })
    })
};

CactusMQ.prototype.subscribe = function (topic) { 
    var eventSource = new EventSource(this.subscribeURL);
    eventSource.addEventListener(topic, e => {
        this.onMessage(e);
    });
};

module.exports = CactusMQ;