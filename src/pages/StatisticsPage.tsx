import { objectManager } from "../classes";
import StatisticInformation from "../components/statistic";

const StatisticsPage = () => {
  const agentManager = objectManager.agentManager;
  const agentsArray = Object.values(agentManager.agents);

  return (
    <div>
      <StatisticInformation agentsArray={agentsArray} />
    </div>
  );
};

export default StatisticsPage;
