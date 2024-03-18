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

  const handleList = () => {
    console.log("MANAGER", queueManager.queueGlobal);
  };

  return (
    <div>
      <QueueTicketing
        client={client}
        onClientSelection={handleClientSelection}
        onList={handleList}
      />
    </div>
  );
};

export default CheckinPage;
