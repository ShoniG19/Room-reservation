import React from "react";

const RoomDetails = ({ room, hotel }) => {
  let color = "text-black"
  switch(room.estado){
    case "disponible":
      color = "text-green-500";
      break;
    case "ocupada":
      color = "text-red-500";
      break;
    case "reservada":
      color = "text-blue-500";
      break;
    case "mantenimiento":
      color = "text-yellow-500";
      break;
  }
  return (
    <div className="bg-white border rounded p-4 shadow text-sm">
      <h2 className="text-lg font-semibold mb-2">Detalles de la Habitación</h2>
      <p><strong>Hotel:</strong> {hotel.nombre}</p>
      <p><strong>Número:</strong> {room.numero}</p>
      <strong className="flex">Estado:<p className={`${color} ml-1`}>{room.estado}</p></strong>
      <p><strong>Piso:</strong> {room.piso}</p>
      <p><strong>Capacidad:</strong> {room.capacidad} personas</p>
      <p><strong>Características:</strong> {room.caracteristicas || room.features?.join(", ")}</p>
    </div>
  );
};

export default RoomDetails;