import React from "react";
import FloorPlanViewer from "../components/Mapa/PlanoViewer";

const PlanoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Plano de Habitaciones</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <FloorPlanViewer />
      </div>
    </div>
  );
};

export default PlanoPage;
