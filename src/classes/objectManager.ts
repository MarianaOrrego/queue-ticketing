import {
  Client,
  ClientType,
  Agent,
  ClientManager,
  AgentManager,
  DisplayManager,
} from "../classes";

export class ObjectManager {
  clientManager: ClientManager;
  displayManager: DisplayManager;
  agentManager: AgentManager;

  constructor() {
    this.displayManager = new DisplayManager();
    this.clientManager = new ClientManager();
    this.agentManager = new AgentManager();
    
    this.tryLoadDisplayManagerData();
    this.tryLoadClientManagerData();
    this.tryLoadAgentManagerData();

    this.tryLoadClientConsecutivePriority();
    this.tryLoadClientConsecutiveBusiness();
    this.tryLoadClientConsecutiveCommon();
    this.tryLoadAgentConsecutiveAgentID();
    
    this.saveToLocalStorage();
  }

  tryLoadClientConsecutivePriority(): void {
    const Client_consecutivePriority = localStorage.getItem(
      "Client_consecutivePriority",
    );
    if (Client_consecutivePriority) {
      Client.consecutivePriority = parseInt(Client_consecutivePriority);
    }
    else {
      console.log("Client_consecutivePriority not found");
    }
  }

  tryLoadClientConsecutiveBusiness(): void {
    const Client_consecutiveBusiness = localStorage.getItem(
      "Client_consecutiveBusiness",
    );
    if (Client_consecutiveBusiness) {
      Client.consecutiveBusiness = parseInt(Client_consecutiveBusiness);
    }
    else {
      console.log("Client_consecutiveBusiness not found");
    }
  }

  tryLoadClientConsecutiveCommon(): void {
    const Client_consecutiveCommon = localStorage.getItem(
      "Client_consecutiveCommon",
    );
    if (Client_consecutiveCommon) {
      Client.consecutiveCommon = parseInt(Client_consecutiveCommon);
    }
    else {
      console.log("Client_consecutiveCommon not found");
    }
  }

  tryLoadAgentConsecutiveAgentID(): void {
    const Agent_consecutiveAgentID = localStorage.getItem(
      "Agent_consecutiveAgentID",
    );
    if (Agent_consecutiveAgentID) {
      Agent.consecutiveAgentID = parseInt(Agent_consecutiveAgentID);
    }
    else {
      console.log("Agent_consecutiveAgentID not found");
    }
  }

  tryLoadDisplayManagerData(): any {
    // Load object states from localStorage
    const displayManager_data = localStorage.getItem("displayManager");

    // Retrieve object states
    if (displayManager_data) {
      const displayManagerParsed = JSON.parse(displayManager_data);
      for (const client of displayManagerParsed.queue) {
        this.displayManager.queue.push(client);
      }
      console.log("Display Manager", displayManagerParsed);
    }
    else {  
      console.log("Display Manager not found");
    }
  }

  retrieveClientData(client: any): Client {
    const clientP = new Client(parseInt(client.clientType));
    clientP.clientID = client.clientID;
    clientP.init_time = parseInt(client.init_time);
    clientP.end_time = parseInt(client.end_time);
    clientP.duration = client.duration;
    return clientP;
  }

  tryLoadClientManagerData(): any {
    // Load object states from localStorage
    const clientManager_data = localStorage.getItem("clientManager");

    // Retrieve object states
    if (clientManager_data) {
      const clientManagerParsed = JSON.parse(clientManager_data);
      this.clientManager.nextToAttendIndex = parseInt(clientManagerParsed.nextToAttendIndex);
      for (const client of clientManagerParsed.queuePriority) {
        this.clientManager.queuePriority.push(this.retrieveClientData(client));
      }
      for (const client of clientManagerParsed.queueBusiness) {
        this.clientManager.queueBusiness.push(this.retrieveClientData(client));
      }
      for (const client of clientManagerParsed.queueCommon) {
        this.clientManager.queueCommon.push(this.retrieveClientData(client));
      }
      this.clientManager.update();
      console.log("Client Manager", clientManagerParsed);
    }
    else {
      console.log("Client Manager not found");
    }
  }

  tryLoadAgentManagerData(): any {
    // Load object states from localStorage
    const agentManager_data = localStorage.getItem("agentManager");

    // Retrieve object states
    if (agentManager_data) {
      const agentManagerParsed = JSON.parse(agentManager_data);
      for (const agentID of Object.keys(agentManagerParsed.agents)) {
        const agent = new Agent(this.clientManager, this.displayManager);
        const agentParsed = agentManagerParsed.agents[agentID];
        agent.agentID = agentID;
        agent.available = Boolean(agentParsed.available);
        if (agentParsed.attendingClient) {
          agent.attendingClient = this.retrieveClientData(agentParsed.attendingClient);
        }
        for (const client of agentParsed.standByClients) {
          agent.standByClients.push(this.retrieveClientData(client));
        }
        for (const clientTypeKey of Object.keys(agentParsed.finishedClients)) {
          const clientType: ClientType = parseInt(clientTypeKey) as ClientType;
          for (const client of agentParsed.finishedClients[clientType]) {
            agent.finishedClients[clientType].push(this.retrieveClientData(client));
          }
        }
        this.agentManager.agents[agentID] = agent;
      }
      console.log("Agent Manager", agentManagerParsed);
    }
    else {
      console.log("Agent Manager not found");
      const A1 = new Agent(this.clientManager, this.displayManager);
      const A2 = new Agent(this.clientManager, this.displayManager);
      this.agentManager.agents[A1.agentID] = A1;
      this.agentManager.agents[A2.agentID] = A2;
      console.log("Agent Manager", this.agentManager);
    }
  }

  saveToLocalStorage(): void {
    //  Save all class attributes to localStorage
    localStorage.setItem("Client_consecutivePriority", JSON.stringify(Client.consecutivePriority));
    localStorage.setItem("Client_consecutiveBusiness", JSON.stringify(Client.consecutiveBusiness));
    localStorage.setItem("Client_consecutiveCommon", JSON.stringify(Client.consecutiveCommon));
    localStorage.setItem("Agent_consecutiveAgentID", JSON.stringify(Agent.consecutiveAgentID));

    localStorage.setItem("displayManager", JSON.stringify(this.displayManager));
    localStorage.setItem("clientManager", JSON.stringify(this.clientManager));
    localStorage.setItem("agentManager", JSON.stringify(this.agentManager));
  }
}

export const objectManager = new ObjectManager();
