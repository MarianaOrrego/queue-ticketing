import "../styles/ticket.css";

type TicketInformationProps = {
  reverseDisplayArray: any[];
};

const TicketInformation = ({ reverseDisplayArray }: TicketInformationProps) => {
  return (
    <div className="ticket-container col-md-12 col-sm-12 row">
      <div className="current-ticket">
        {reverseDisplayArray.length > 0 ? (
          <div className="text-ticket">
            <p>
              {reverseDisplayArray[0][1]} - Asesor {reverseDisplayArray[0][0]}
            </p>
          </div>
        ) : (
          <div className="text-ticket">
            <p>X00 - Asesor 00</p>
          </div>
        )}
      </div>

      <div className="processed-tickets">
        <h2>Turnos Llamados</h2>
        {reverseDisplayArray.length > 1 ? (
          <div>
            {reverseDisplayArray.slice(1).map((agent) => (
              <p key={agent[1]}>
                {agent[1]} - Asesor {agent[0]}
              </p>
            ))}
          </div>
        ) : (
          <div>No se han llamado turnos</div>
        )}
      </div>
    </div>
  );
};

export default TicketInformation;
