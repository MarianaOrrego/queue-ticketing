import { ClientType } from "../classes";
import { QueueTicketingProps } from "../interfaces";

import "../styles/card.css";

const QueueTicketing = (props: QueueTicketingProps) => {
  const { client, onClientSelection, onList } = props;

  const handleClientSelection = (clientType: ClientType) => {
    if (onClientSelection) {
      onClientSelection(clientType);
    }
  };

  const handleList = () => {
    if (onList) {
      onList();
    }
  };

  return (
    <div className="col-md-12 mt-5">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Usuario</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            Escoja el tipo de usuario con el que realizará el trámite
          </h6>
          <button
            className="card-button"
            onClick={() => handleClientSelection(ClientType.PRIORITY)}
          >
            Prioritario
          </button>
          <button
            className="card-button"
            onClick={() => handleClientSelection(ClientType.BUSINESS)}
          >
            Buena gente
          </button>
          <button
            className="card-button"
            onClick={() => handleClientSelection(ClientType.COMMON)}
          >
            Cliente
          </button>
          <button className="card-button" onClick={handleList}>
            Lists
          </button>
        </div>
      </div>
      <div className="mt-5">
        <div className="current-ticket">
          <div className="text-ticket">
            <p>{client}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueTicketing;
