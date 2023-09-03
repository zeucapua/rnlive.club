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
    this.party.broadcast(`[${this.party.id} (onConnect)] PARTY BROADCAST: ${connection.id} has joined room!`);
    console.log("this.party.getConnections(): ");
    for (const c of this.party.getConnections()) {
      console.log(c.id);
    }
  }

  onMessage(message : string, connection : PartyConnection) {
    this.party.broadcast(`[${this.party.id} (onMessage)] PARTY BROADCAST: ${message} [Connection ID: ${connection.id}]`); 
  }

  onClose(connection : PartyConnection) {
    this.party.broadcast(`[${this.party.id} (onClose)] PARTY BROADCAST: ${connection.id} has left(?)`) 
  }
}

RnLiveParty satisfies PartyWorker;
