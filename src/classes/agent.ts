import { Client, ClientType, ClientManager } from "./client";
import { DisplayManager } from "./display";

export class Agent {
  static consecutiveAgentID: number = 1;
  agentID: string;
  attendingClient: Client | null = null;
  finishedClients: Record<ClientType, Client[]> = {
    [ClientType.PRIORITY]: [],
    [ClientType.BUSINESS]: [],
    [ClientType.COMMON]: [],
  };
  standByClients: Client[] = [];
  available: boolean = true;

  constructor(
    private clientManager: ClientManager,
    private displayManager: DisplayManager,
  ) {
    this.agentID = `A${Agent.consecutiveAgentID.toString().padStart(2, "0")}`;
    Agent.consecutiveAgentID++;
  }

  callClient(): boolean {
    const client = this.clientManager.getNextClient();
    if (client) {
      this.attendingClient = client;
      this.available = false;
      this.attendingClient.init_time = Date.now();
      this.displayManager.append([this.agentID, client.clientID]);
      return true;
    } else {
      alert(`${this.agentID} No hay clientes en espera, agente disponible`);
      return false;
    }
  }

  finishClient(): void {
    if (this.attendingClient) {
      const clientType = this.attendingClient.clientType;
      if (this.attendingClient.init_time) {
        this.attendingClient.end_time = Date.now();
        this.attendingClient.getDuration();
      }
      this.finishedClients[clientType].push(this.attendingClient);
      this.attendingClient = null;
      this.available = true;
    }
  }

  standByClient(): void {
    if (this.attendingClient) {
      this.standByClients.push(this.attendingClient);
      this.attendingClient = null;
      this.available = true;
      this.callClient();
    }
  }

  repeatCall(): void {
    if (this.attendingClient) {
      this.displayManager.remove([this.agentID, this.attendingClient.clientID]);
      this.displayManager.append([this.agentID, this.attendingClient.clientID]);
    }
  }

  callFromStandBy(): void {
    if (this.standByClients.length > 0) {
      this.attendingClient = this.standByClients.shift() || null;
      this.repeatCall();
      if (this.attendingClient) {
        this.available = false;
        alert(
          `${this.agentID} Llamando a cliente ${this.attendingClient.clientID} de la lista de espera`,
        );
      }
    } else {
      alert(`${this.agentID} No hay clientes en espera`);
    }
  }
}

export class AgentManager {
  agents: Record<string, Agent> = {};

  addAgent(agent: Agent): void {
    this.agents[agent.agentID] = agent;
  }

  removeAgent(agent: Agent): void {
    delete this.agents[agent.agentID];
  }
}
