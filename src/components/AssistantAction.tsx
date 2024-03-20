import { PropsAssistantAction } from "../interfaces";
import "../styles/card.css";

const AssistantAction = (props: PropsAssistantAction) => {
  const {
    agentsArray,
    agentStatus,
    onStandBy,
    onFinish,
    onNext,
    onRepeat,
    onCallStandBy,
  } = props;

  return (
    <div className="col-md-12 mt-5">
      {agentsArray.map((agent, index) => (
        <div key={agent.agentID}>
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Asesor {agent.agentID}</h5>
              <p className="card-subtitle mb-2 text-body-secondary">
                {agentStatus[index]
                  ? "Disponible"
                  : `Ocupado atendiendo a ${agent.attendingClient?.clientID}`}
              </p>
              <h6 className="card-text">Escoja la acción que realizara</h6>
              <button className="card-button" onClick={() => onNext(index)}>
                Siguiente
              </button>
              <button className="card-button" onClick={() => onRepeat(index)}>
                Repetir llamado
              </button>
              <button
                className="card-button"
                onClick={() => onCallStandBy(index)}
              >
                Lista de espera
              </button>
              <button className="card-button" onClick={() => onStandBy(index)}>
                No atentido
              </button>
              <button className="card-button" onClick={() => onFinish(index)}>
                Terminado
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssistantAction;
