import type {
  Party,
  PartyConnection,
  PartyConnectionContext,
  PartyServer,
  PartyWorker
} from "partykit/server";

export default class RnLiveParty implements PartyServer {
  constructor(public party : Party) {}

  onMessage(message : string, connection : PartyConnection) {
    const message_data = JSON.parse(message);
    switch (message_data.type) {
      case "log": {
        console.log(message_data.content);
        break;
      }

      case "ping": {
        const response = JSON.stringify({
          type: "pong",
          content: message_data.content
        });

        this.party.broadcast(response);
        break;
      }

      default: {
        console.log({ message_data });
        break;
      }
    }
  }

  onClose(connection : PartyConnection) {

  }
}

RnLiveParty satisfies PartyWorker;
