import React, {useState, useEffect} from "react";
import { getListadoHotel } from "../api/hotelApi";

const ReservasFilter = ({ filtros, setFiltros, onBuscar }) => {
const [hoteles, setHoteles] = useState([]);
useEffect(() => {
    const cargarHoteles = async () => {
      try {
        const data = await getListadoHotel();
        setHoteles(data);
      } catch (err) {
        console.error("Error al cargar hoteles", err);
      }
    };

    cargarHoteles();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow flex flex-wrap gap-4 items-end mb-6">
      <div>
        <label className="text-sm font-semibold">Hotel</label>
        <select
          value={filtros.hotelId}
          onChange={(e) => setFiltros({ ...filtros, hotelId: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">Seleccione un hotel</option>
            {hoteles.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                {hotel.nombre}
                </option>
            ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold">Fecha Ingreso</label>
        <input
          type="date"
          value={filtros.fechaIngreso}
          onChange={(e) => setFiltros({ ...filtros, fechaIngreso: e.target.value })}
          className="border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Fecha Salida</label>
        <input
          type="date"
          value={filtros.fechaSalida}
          onChange={(e) => setFiltros({ ...filtros, fechaSalida: e.target.value })}
          className="border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Cliente (Cédula)</label>
        <input
          type="text"
          placeholder="1234567"
          value={filtros.cliente}
          onChange={(e) => setFiltros({ ...filtros, cliente: e.target.value })}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={() => onBuscar(0)}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Buscar
      </button>
    </div>
  );
};

export default ReservasFilter;
