import React from "react";

const HotelSelector = ({ hotels, selectedHotel, onSelectHotel }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium">Hotel</h2>
      <select
        value={selectedHotel.id || 0}
        onChange={(e) => {
          if(e.target.value !== ""){
            const selected = hotels.find((h) => h.id === e.target.value);   
            onSelectHotel(selected)
          }
        }}
      >
        <option value="" >Seleccione un hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.nombre} ({hotel.cantidadHabitaciones || 0} habs.)
            </option>
          ))}
      </select>
    </div>
  );
};

export default HotelSelector;
