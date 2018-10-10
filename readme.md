# Example React Native client for CactusMQ
www.cactusmq.com | https://github.com/cactusmq

## Setup:
npm i --save cactusmq-react-native

## Import:
import CactusMQ from "cactusmq-react-native"

## Usage:
this.cactusmq = new CactusMQ({
    publishKey: ${CACTUSMQ_PUBKEY},
    subscribeKey: ${CACTUSMQ_SUBKEY},
    onMessage: eventText => {
        this.handleEventText(eventText);
    }
});

this.cactusmq.subscribe("new-message");

## Run curl publisher:
$ curl -d "topic=some-topic-name&message=This is my message." http://www.cactusmq.com/publish/${CACTUSMQ_PUBKEY};

Visit https://github.com/cactusmq for other ways to publish or subscribe to CactusMQ.