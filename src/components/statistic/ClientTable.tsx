import { Client } from "../../classes";
import { ClientTableProps } from "../../interfaces";

import "../../styles/table.css";

const ClientTable = ({ clients, title }: ClientTableProps) => (
  <div className="col-md-3">
    <p className="card-subtitle mb-2 text-body-secondary">{title}</p>
    {clients.length > 0 ? (
      <table className="table-container">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client: Client) => (
            <tr key={client.clientID}>
              <td>{client.clientID}</td>
              <td>{client.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div>No se han atendido turnos</div>
    )}
  </div>
);

export default ClientTable;
