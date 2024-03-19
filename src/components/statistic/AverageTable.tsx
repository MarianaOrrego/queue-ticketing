import { calculateAverageDuration } from "../../functions";
import { ClientTableProps } from "../../interfaces";
import "../../styles/table.css";

const AverageTable = ({ clients, title }: ClientTableProps) => {
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
