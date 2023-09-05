import type {
  Party,
  PartyConnection,
  PartyConnectionContext,
  PartyServer,
  PartyWorker
} from "partykit/server";

export default class RnLiveParty implements PartyServer {
  constructor(public party : Party) {}

  onConnect(connection : PartyConnection, context : PartyConnectionContext) {
    const message = JSON.stringify({
      type: "log",
      content: `[${this.party.id} (onConnect)] PARTY BROADCAST: ${connection.id} has joined room!`
    });
    this.party.broadcast(message);
  }

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
