import "../../styles/table.css";

const AverageTable = () => {
  return (
    <div className="col-md-3">
      <p className="card-subtitle mb-2 text-body-secondary">Promedios</p>

      <table className="table-container">
        <tbody>
          <tr>
            <td>Prioritario</td>
            <td>Promedio</td>
          </tr>
          <tr>
            <td>Buena Gente</td>
            <td>Promedio</td>
          </tr>
          <tr>
            <td>Cliente Normal</td>
            <td>Promedio</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>Promedio</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AverageTable;
