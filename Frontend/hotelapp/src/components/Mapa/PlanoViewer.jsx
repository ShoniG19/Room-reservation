import React, { useState, useEffect } from "react";
import { getListadoHotelconCantidad } from "../../api/hotelApi";
import { getHabitacionesConReservas } from "../../api/habitacionApi";
import HotelSelector from "./HotelSelector";
import FloorSelector from "./FloorSelector";
import RoomFilters from "./RoomFilters";
import RoomLegend from "./RoomLegend";
import RoomDetails from "./RoomDetails";
import RoomMap from "./RoomMap";

const FloorPlanViewer = () => {
  const [hoteles, setHoteles] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    if(room.estado === "ocupada"){
      if(room.Reservas.length > 0){
        setShowModal(true);
      }
    }
    if(room.estado === "reservada" ){
      if(room.Reservas.length > 1){
        setShowModal(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const hotelesData = await getListadoHotelconCantidad();
      const habitacionesData = await getHabitacionesConReservas();
      setHoteles(hotelesData);
      setHabitaciones(habitacionesData);
      setSelectedHotel(hotelesData[0]);
    };
    fetchData();
  }, []);

  if (!selectedHotel) return <p>Cargando...</p>;

  const hotelRooms = habitaciones.filter(h => h.hotelId === selectedHotel.id);
  const pisos = [...new Set(hotelRooms.map(h => h.piso))].sort();
  
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0'); 
  const anio = fecha.getFullYear();

  const fechaFormateada = `${dia}/${mes}/${anio}`;

  if (!pisos.includes(selectedFloor)) setSelectedFloor(pisos[0]);

  const hoy = new Date();

  const habitacionesConEstadoCalculado = hotelRooms.map((hab) => {
    const reservas = hab.Reservas || [];

    const hayReservadaFutura = reservas.some(
      (res) => new Date(res.fechaIngreso) > hoy
    );

    let estadoCalculado = hab.estado;
   
    if (hab.estado === "ocupada") {
      estadoCalculado = "ocupada";
    } else if (hayReservadaFutura) {
      estadoCalculado = "reservada";
    }

    return {
      ...hab,
      estado: estadoCalculado,
    };
  });

  const filteredRooms = habitacionesConEstadoCalculado.filter(r =>
    r.piso === selectedFloor &&
    (!statusFilter || r.estado === statusFilter)
  );

  const handleHotelChange = hotel => {
    setSelectedHotel(hotel);
    setSelectedRoom(null);
    const hotelFloors = [...new Set(habitaciones.filter(h => h.hotelId === hotel.id).map(h => h.piso))];
    setSelectedFloor(hotelFloors[0] || 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="space-y-4 w-1/3">
          <HotelSelector hotels={hoteles} selectedHotel={selectedHotel} onSelectHotel={handleHotelChange} />
        </div>
        <div className="flex w-8/12 justify-between">
            <FloorSelector pisos={pisos} selectedFloor={selectedFloor} onSelectFloor={setSelectedFloor} />
            <RoomFilters
              statusFilter={statusFilter}
              typeFilter={typeFilter}
              onStatusFilterChange={setStatusFilter}
              onTypeFilterChange={setTypeFilter}
              zoomLevel={zoomLevel}
              onZoomChange={setZoomLevel}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-gray-50 rounded-lg border overflow-hidden">
          <div className="p-2 bg-gray-100 border-b flex justify-between items-center">
            <h3 className="font-medium">{selectedHotel.nombre} - Piso {selectedFloor}</h3>
            <span className="text-sm text-muted-foreground">{filteredRooms.length} habitación/es</span>
            <span>Fecha: {fechaFormateada}</span>
          </div>
          <RoomMap
            rooms={filteredRooms}
            onSelectRoom={setSelectedRoom}
            selectedRoom={selectedRoom}
            zoomLevel={zoomLevel}
            clickModal={handleRoomClick}
          />
        </div>
        <div className="space-y-6">
          <RoomLegend />
          {selectedRoom && <RoomDetails room={selectedRoom} hotel={selectedHotel} />}
        </div>

        {showModal && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-2">
              Habitación {selectedRoom.numero}
            </h2>
            <p className="mb-2">
              <span className="font-medium">Estado actual:</span>{" "}
              {selectedRoom.estado}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold">Reservas futuras:</h3>
              {selectedRoom.Reservas && selectedRoom.Reservas.length > 0 ? (
                <ul className="list-disc list-inside text-sm mt-2">
                  {selectedRoom.Reservas.map((reserva, i) => (
                    <li key={i}>
                      {reserva.fechaIngreso} →{" "}{reserva.fechaSalida}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm mt-2">No hay reservas.</p>
              )}
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default FloorPlanViewer;
