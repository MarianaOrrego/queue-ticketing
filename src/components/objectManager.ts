import { AgentManager, DisplayManager, QueueManager } from "../classes";

const queueManager = new QueueManager();
const displayManager = new DisplayManager();
const agentManager = new AgentManager(queueManager, displayManager);

export const objectManager = {
  queueManager: queueManager,
  displayManager: displayManager,
  agentManager: agentManager,
};
