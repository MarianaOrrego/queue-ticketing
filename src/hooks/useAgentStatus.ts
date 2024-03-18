import { useState } from "react";

type UseAgentStatus = [boolean[], (index: number, available: boolean) => void];

export const useAgentStatus = (initialStatus: boolean[]): UseAgentStatus => {
  const [agentStatus, setAgentStatus] = useState(initialStatus);

  const handleStatusChange = (index: number, available: boolean) => {
    const updatedAgentStatus = [...agentStatus];
    updatedAgentStatus[index] = available;
    setAgentStatus(updatedAgentStatus);
  };

  return [agentStatus, handleStatusChange];
};