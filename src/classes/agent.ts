import { Client, ClientType, QueueManager } from "./client";
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
    private queueManager: QueueManager,
    private displayManager: DisplayManager,
  ) {
    this.agentID = `A${Agent.consecutiveAgentID.toString().padStart(2, "0")}`;
    Agent.consecutiveAgentID++;
  }

  callClient(): boolean {
    const client = this.queueManager.getNextClient();
    if (client) {
      this.attendingClient = client;
      this.available = false;
      this.attendingClient.init_time = new Date();
      this.displayManager.append([this.agentID, client.clientID]);
      return true;
    } else {
      console.log(
        `${this.agentID} No hay clientes en espera, agente disponible`,
      );
      return false;
    }
  }

  finishClient(): void {
    if (this.attendingClient) {
      const clientType = this.attendingClient.clientType;
      if (this.attendingClient.init_time) {
        this.attendingClient.end_time = new Date();
        this.attendingClient.getDuration();
      }
      this.finishedClients[clientType].push(this.attendingClient);
      this.attendingClient = null;
      this.available = true;
      console.log(
        `${this.agentID} Cliente ${
          this.finishedClients[clientType].slice(-1)[0].clientID
        } terminado, agente disponible`,
      );
    }
  }

  standByClient(): void {
    if (this.attendingClient) {
      this.standByClients.push(this.attendingClient);
      this.attendingClient = null;
      this.available = true;
      console.log(`${this.agentID} Cliente en espera, agente disponible`);
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
      if (this.attendingClient) {
        console.log(
          `${this.agentID} Llamando a cliente: ${this.attendingClient.clientID}`,
        );
      }
    }
  }
}

export class AgentManager {
  agents: Record<string, Agent> = {};

  constructor(private queueManager: QueueManager, private displayManager: any) {
    const A1 = new Agent(queueManager, displayManager);
    const A2 = new Agent(queueManager, displayManager);
    this.agents[A1.agentID] = A1;
    this.agents[A2.agentID] = A2;
  }

  addAgent(agent: Agent): void {
    this.agents[agent.agentID] = agent;
  }

  removeAgent(agent: Agent): void {
    delete this.agents[agent.agentID];
  }
}
