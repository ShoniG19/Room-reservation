import React from "react";

const habitacionesGrid = ({ habitaciones, onSelect, seleccionada }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Habitaciones Disponibles</h2>
      <div className="grid grid-cols-3 gap-4">
        {habitaciones.map((h) => {
          const esSeleccionada = seleccionada && seleccionada.id === h.id;

          return (
            <div
              key={h.id}
              className={`border p-4 space-y-2 rounded shadow bg-white ${
                esSeleccionada ? "border-green-500" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{h.numero}</h3>
                <span className="bg-black text-white text-xs font-semibold px-2 py-1 rounded-xl">
                  {h.Hotel?.nombre}
                </span>
              </div>

              <p className="text-sm">
                <span className="font-bold">Piso:</span> {h.piso}
              </p>
              <p className="text-sm">
                <span className="font-bold">Capacidad:</span> {h.capacidad}{" "}
                persona/s
              </p>

              <p className="text-sm font-bold">Características:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {h.caracteristicas?.split(",").map((carac, index) => (
                  <span
                    key={index}
                    className="bg-gray-300 text-black text-xs px-2 py-1 rounded-xl"
                  >
                    {carac.trim()}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onSelect(h)}
                className={`mt-6 w-full py-1 rounded font-semibold transition ${
                  esSeleccionada
                    ? "bg-white text-green-700 border border-green-400 hover:bg-green-200"
                    : "bg-black text-white hover:bg-gray-700"
                }`}
              >
                {esSeleccionada
                  ? "Seleccionado"
                  : "Seleccionar Habitación"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default habitacionesGrid;
