import ClientTable from "./ClientTable";
import AverageTable from "./AverageTable";

import { StatisticInformationProps } from "../../interfaces";

import "../../styles/ticket.css";

const StatisticInformation = ({ agentsArray }: StatisticInformationProps) => {
  return (
    <div className="container">
      {agentsArray.map((agent) => (
        <div className="card card-container mt-5" key={agent.agentID}>
          <div className="card-body">
            <h5 className="card-title">Asesor {agent.agentID}</h5>
            <div className="col-md-12 row">
              <div className="col-md-3">
                <p className="card-subtitle mb-2 text-body-secondary">
                  Promedios
                </p>
                <AverageTable
                  clients={agent.finishedClients[1]}
                  title="Prioritario"
                />
                <AverageTable
                  clients={agent.finishedClients[2]}
                  title="Buena Gente"
                />
                <AverageTable
                  clients={agent.finishedClients[3]}
                  title="Cliente Normal"
                />
              </div>
              <ClientTable
                clients={agent.finishedClients[1]}
                title="Turnos Atendidos Prioritario"
              />
              <ClientTable
                clients={agent.finishedClients[2]}
                title="Turnos Atendidos Buena Gente"
              />
              <ClientTable
                clients={agent.finishedClients[3]}
                title="Turnos Atendidos Cliente Normal"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticInformation;
