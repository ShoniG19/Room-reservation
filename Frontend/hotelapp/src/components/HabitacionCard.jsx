import React from "react";

const HabitacionCard = ({ habitacion, onSelect }) => {
  return (
    <div className="habitacion-card">
      <p><strong>Hotel:</strong> {habitacion.Hotel?.nombre}</p>
      <p><strong>Número:</strong> {habitacion.numero}</p>
      <p><strong>Piso:</strong> {habitacion.piso}</p>
      <p><strong>Capacidad:</strong> {habitacion.capacidad}</p>
      <p><strong>Características:</strong> {habitacion.caracteristicas}</p>
      <button onClick={() => onSelect(habitacion)}>Seleccionar</button>
    </div>
  );
};

export default HabitacionCard;
