import RNEventSource from "react-native-event-source";

const cactusSubscribeURL = "http://api.cactusmq.com/v1/subscribe/";
const cactusPublishURL = "http://api.cactusmq.com/v1/publish/";

export default class CactusMQ {
  constructor(options) {
    this.publishKey = options.publishKey;
    this.subscribeKey = options.subscribeKey;
    this.eventSource = new RNEventSource(
      cactusSubscribeURL.concat(this.subscribeKey)
    );
    this.cactusPublish = cactusPublishURL.concat(this.publishKey);
    this.onMessage = options.onMessage;
  }

  publish(topic, message) {
    fetch(this.cactusPublish, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic: topic,
        message: message
      })
    });
  }

  subscribe(topic) {
    this.eventSource.addEventListener(topic, event => {
      this.onMessage(event.data);
    });
  }
}
