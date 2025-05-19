import React from "react";

const RoomLegend = () => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Leyenda</h2>
      <div className="space-y-1 text-sm">
        <div><span className="inline-block w-4 h-4 bg-green-200 border border-green-500 mr-2"></span>Disponible</div>
        <div><span className="inline-block w-4 h-4 bg-red-200 border border-red-500 mr-2"></span>Ocupada</div>
        <div><span className="inline-block w-4 h-4 bg-blue-200 border border-blue-500 mr-2"></span>Reservada</div>
        <div><span className="inline-block w-4 h-4 bg-amber-200 border border-amber-500 mr-2"></span>Mantenimiento</div>
      </div>
    </div>
  );
};

export default RoomLegend;