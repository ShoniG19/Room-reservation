import React from "react";

const ReservasTable = ({ reservas }) => {
  return (
    <div className="bg-white rounded shadow">
      <div className="p-4 font-semibold text-xl">Todas las Reservas</div>
      <table className="place-self-center w-11/12 table-auto">
        <thead className="text-sm bg-black text-white">
          <tr>
            <th className="p-3">Res. ID</th>
            <th className="p-3">Cliente</th>
            <th className="p-3">Hotel / Habitación-Piso</th>
            <th className="p-3">Ingreso / Salida</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id} className="border-t text-sm">
              <td className="p-3">RES-{r.id.toString().padStart(3, "0")}</td>
              <td className="p-3">
                <p className="flex justify-center">{r.Cliente?.nombre} {r.Cliente?.apellido}</p>
                <span className="flex justify-center text-xs text-gray-500">CI: {r.Cliente?.cedula}</span>
              </td>
              <td className="p-3">
                <p className="flex justify-center">{r.Habitacion?.Hotel?.nombre}</p>
                <p className="flex justify-center">Habitación {r.Habitacion?.numero} • Piso {r.Habitacion?.piso}</p>
              </td>
              <td className="p-3">
                <p className="flex justify-center">{r.fechaIngreso}</p>
                <span className="flex justify-center text-xs text-gray-500">a {r.fechaSalida}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservasTable;
