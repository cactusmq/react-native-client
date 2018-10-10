var request = require("request");
var EventSource = require("eventsource");

var ApiURL = "http://api.cactusmq.com/v1/";

function CactusMQ(options) {
    this.publishURL = ApiURL.concat("publish/", options.publishKey);
    this.subscribeURL = ApiURL.concat("subscribe/", options.subscribeKey);
    this.onMessage = options.onMessage;
    this.onPublish = options.onPublish;
    this.onError = options.onError;
};

CactusMQ.prototype.publish = function(topic, message, data) { 
    request({
        url: this.publishURL,
        method: "POST",
        json: true,
        body: {
            topic: topic,
            message: message,
            data: data
          }
    }, (error, response, body) => {
        if (error) {
            this.onError(error);
        } else {
            this.onPublish(body);
        }
    });
};

CactusMQ.prototype.subscribe = function (topic) { 
    var eventSource = new EventSource(this.subscribeURL);
    eventSource.addEventListener(topic, e => {
        this.onMessage(e);
    });
};

module.exports = CactusMQ;