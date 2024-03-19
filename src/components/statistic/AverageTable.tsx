import { Client } from "../../classes";
import { ClientTableProps } from "../../interfaces";
import "../../styles/table.css";

const AverageTable = ({ clients, title }: ClientTableProps) => {
  const calculateAverageDuration = (users: Client[]) => {
    if (users.length === 0) return "00:00:00";

    const totalDuration = users.reduce((acc, client) => {
      const time = client.duration.split(":").map(Number);
      const seconds = time[0] * 3600 + time[1] * 60 + time[2];
      return acc + seconds;
    }, 0);

    const averageSeconds = totalDuration / users.length;
    const hours = Math.floor(averageSeconds / 3600);
    const minutes = Math.floor((averageSeconds % 3600) / 60);
    const seconds = Math.floor(averageSeconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <>
      <table className="table-container">
        <tbody>
          <tr>
            <td>{title}</td>
            <td>{calculateAverageDuration(clients)}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AverageTable;
