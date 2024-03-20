import { useState, useEffect } from "react";

type UseAgentStatus = [boolean[], (index: number, available: boolean) => void];

export const useAgentStatus = (initialStatus: boolean[]): UseAgentStatus => {
  const [agentStatus, setAgentStatus] = useState(initialStatus);

  useEffect(() => {
    const savedStatus = localStorage.getItem("agentStatus");
    if (savedStatus) {
      setAgentStatus(JSON.parse(savedStatus));
    }
  }, []);

  const handleStatusChange = (index: number, available: boolean) => {
    const updatedAgentStatus = [...agentStatus];
    updatedAgentStatus[index] = available;
    setAgentStatus(updatedAgentStatus);
    localStorage.setItem("agentStatus", JSON.stringify(updatedAgentStatus));
  };

  return [agentStatus, handleStatusChange];
};
