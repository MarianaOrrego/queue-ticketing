import { useState } from "react";
import QueueTicketing from "../components/QueueTicketing";
import { Client, ClientType, objectManager } from "../classes";

const CheckinPage = () => {
  const [client, setClient] = useState("");
  const clientManager = objectManager.clientManager;

  const handleClientSelection = (clientType: ClientType) => {
    const newClient = new Client(clientType);
    setClient(newClient.clientID);
    clientManager.addClient(newClient);
    objectManager.clientManager = clientManager;
    objectManager.saveToLocalStorage();
  };

  return (
    <div>
      <QueueTicketing
        client={client}
        onClientSelection={handleClientSelection}
      />
    </div>
  );
};

export default CheckinPage;
