import { ClientType } from "../classes";

export type QueueTicketingProps = {
  client: string;
  onClientSelection: (clientType: ClientType) => void;
};
