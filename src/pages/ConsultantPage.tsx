import { objectManager } from "../classes";
import AssistantAction from "../components/AssistantAction";
import { useAgentStatus } from "../hooks/useAgentStatus";

const ConsultantPage = () => {
  const agentManager = objectManager.agentManager;
  const agentsArray = Object.values(agentManager.agents);
  const agent = agentsArray;

  const [agentStatus, handleStatusChange] = useAgentStatus(
    agentsArray.map(() => true),
  );

  const handleStandBy = (index: number) => {
    agent[index].standByClient();
    objectManager.agentManager = agentManager;
    handleStatusChange(index, agent[index].available);
  };

  const handleFinish = (index: number) => {
    agent[index].finishClient();
    objectManager.agentManager = agentManager;

    handleStatusChange(index, agent[index].available);
  };

  const handleNext = (index: number) => {
    console.log("StandBy Clients:", agent[index].standByClients);
    agent[index].callClient();
    objectManager.agentManager = agentManager;

    handleStatusChange(index, agent[index].available);
  };

  const handleRepeat = (index: number) => {
    agent[index].repeatCall();
    objectManager.agentManager = agentManager;
    alert(
      `Llamando al cliente ${agent[index].attendingClient?.clientID} nuevamente`,
    );
  };

  return (
    <div>
      <AssistantAction
        agentsArray={agentsArray}
        agentStatus={agentStatus}
        onStandBy={handleStandBy}
        onFinish={handleFinish}
        onNext={handleNext}
        onRepeat={handleRepeat}
      />
    </div>
  );
};

export default ConsultantPage;
