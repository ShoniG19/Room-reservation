import React, { useEffect, useState} from "react";
import { getListadoHotel } from "../api/hotelApi";

const ReservaForm = ({ form, setForm, onBuscar }) => {
  const [hoteles, setHoteles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const hotelesData = await getListadoHotel();
      console.log(hotelesData)
      setHoteles(hotelesData);
    };
    fetchData();
  }, []);

  const handleBuscar = () => {
    const hoy = new Date().toISOString().split("T")[0];

    if (!form.fechaIngreso || !form.fechaSalida) {
      return alert("Debe completar ambas fechas.");
    }

    if (form.fechaIngreso < hoy) {
      return alert("La fecha de ingreso no puede ser anterior a hoy.");
    }

    if (form.fechaSalida < form.fechaIngreso) {
      return alert("La fecha de salida debe ser posterior a la de ingreso.");
    }

    if (form.capacidad && form.capacidad <= 0) {
      return alert("La capacidad debe ser mayor o igual a 1.");
    }

    onBuscar();
  };

  return (
    <div
      className="bg-white p-6 rounded shadow mb-6"
      style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <h2 className="text-xl font-bold mb-4">
        Buscar habitaciones disponibles
      </h2>
      <div className="grid grid-cols-4 gap-4">
        <input
          type="date"
          value={form.fechaIngreso}
          onChange={(e) => setForm({ ...form, fechaIngreso: e.target.value })}
          min={new Date().toISOString().split("T")[0]}
          className="border px-3 py-2 rounded"
          placeholder="Fecha de Ingreso"
        />
        <input
          type="date"
          value={form.fechaSalida}
          onChange={(e) => setForm({ ...form, fechaSalida: e.target.value })}
          min={form.fechaIngreso || new Date().toISOString().split("T")[0]}
          className="border px-3 py-2 rounded"
          placeholder="Fecha de Salida"
        />
        <input
          type="number"
          min={1}
          value={form.capacidad || 1}
          onChange={(e) => setForm({ ...form, capacidad: e.target.value })}
          className="border px-3 py-2 rounded"
          placeholder="Capacidad (Personas)"
        />
        <select
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        className="border px-3 py-2 rounded"
        >
          <option>Seleccione un Hotel</option>
          {hoteles.map((h) =>
            <option>{h.nombre}</option>
          )}
        </select>
      </div>
      <button
        onClick={handleBuscar}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </div>
  );
};

export default ReservaForm;
