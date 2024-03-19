import { useState } from "react";
import QueueTicketing from "../components/QueueTicketing";
import { Client, ClientType, objectManager } from "../classes";

const CheckinPage = () => {
  const [client, setClient] = useState("");
  const queueManager = objectManager.queueManager;

  const handleClientSelection = (clientType: ClientType) => {
    const newClient = new Client(clientType);
    setClient(newClient.clientID);
    queueManager.addClient(newClient);
    objectManager.queueManager = queueManager;
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
