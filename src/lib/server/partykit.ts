import type {
  Party,
  PartyServer,
  PartyWorker
} from "partykit/server";

export default class RnLiveParty implements PartyServer {
  // can access to Party's state within this class using 'this.party'
  constructor(public party : Party) {}

  // runs when a connection SENDS a message using 'socket.send(message)'
  onMessage(message : string) {

    // from /[username] (aka viewer): { type: 'ping', content: 'emoteName' }
    const message_data = JSON.parse(message);
    switch (message_data.type) {
      case "ping": {

        // create a response to send to /overlay
        const response = JSON.stringify({
          type: "pong",
          content: message_data.content
        });

        // 'this.party.broadcast' sends a message from server to client
        // can be caught on client with 'socket.addEventListener('message', (event) => {})'
        this.party.broadcast(response);
        break;
      }

      default: {
        console.log({ message_data });
        break;
      }
    }
  }
}

RnLiveParty satisfies PartyWorker;
