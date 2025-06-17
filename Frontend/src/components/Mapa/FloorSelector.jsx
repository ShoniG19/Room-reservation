import React from "react";

const FloorSelector = ({ pisos, selectedFloor, onSelectFloor }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Piso</h2>
      <div className="flex gap-2">
        {pisos.map((piso) => (
          <button
            key={piso}
            className={`px-4 py-1 rounded border text-sm font-medium transition-all ${
              piso === selectedFloor ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => onSelectFloor(piso)}
          >
            Piso {piso}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;