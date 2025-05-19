import React from "react";

const RoomFilters = ({
  statusFilter,
  typeFilter,
  onStatusFilterChange,
  onTypeFilterChange,
  zoomLevel,
  onZoomChange,
}) => {
  return (
    <div className="flex space-x-10">
      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select
          value={statusFilter || ""}
          onChange={(e) => onStatusFilterChange(e.target.value || null)}
          className="border px-3 py-1 rounded w-full"
        >
          <option value="">Todos</option>
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="reservada">Reservada</option>
          <option value="mantenimiento">Mantenimiento</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Zoom</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={zoomLevel}
          onChange={(e) => onZoomChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RoomFilters;