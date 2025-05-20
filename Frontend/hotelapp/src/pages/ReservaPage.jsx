import React, { useState, useEffect } from "react";

import { buscarHabitaciones, crearReserva } from "../api/reservaApi";

import ReservaForm from "../components/ReservaForm";
import ClienteForm from "../components/ClienteForm";
import HabitacionesGrid from "../components/HabitacionesGrid";
import Modal from "../components/Modal";

import obtenerFechasHoyYManana from "../utils/obtenerFecha";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";


const ReservaPage = () => {
  const [form, setForm] = useState({
    fechaIngreso: "",
    fechaSalida: "",
    capacidad: "",
    nombre:""
  });
  const [habitaciones, setHabitaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [cliente, setCliente] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
  });
  const [clienteConfirmado, setClienteConfirmado] = useState(false);
  const [mostrarBotonReserva, setMostrarBotonReserva] = useState(false);
  const [showResumenModal, setShowResumenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [cargandoReserva, setCargandoReserva] = useState(false);

  
  useEffect(() => {
    const cargarPorDefecto = async () => {
      const fechas = obtenerFechasHoyYManana();
      setForm(fechas);
      try {
        const {total, data} = await buscarHabitaciones(fechas, page, pageSize);
        setHabitaciones(data);
        setTotal(total);
      } catch (err) {
        console.error("Error al cargar habitaciones por defecto", err);
      }
    };

    cargarPorDefecto();
  }, [page]);

  const handleBuscar = async (pagina = 0) => {
    const {data, total} = await buscarHabitaciones(form, pagina, pageSize);
    setHabitaciones(data);
    setTotal(total);
  };

  const handleSeleccionHabitacion = (habitacion) => {
    if (seleccionada && seleccionada.id === habitacion.id) {
      setSeleccionada(null); 
    } else {
      setSeleccionada(habitacion); 
    }
  };

  const handleConfirmarCliente = () => {
    setClienteConfirmado(true);
    setMostrarBotonReserva(true);
  };

  const handleReservar = async () => {
    setCargandoReserva(true);
    const payload = {
      fechaIngreso: form.fechaIngreso,
      fechaSalida: form.fechaSalida,
      cantidadPersonas: seleccionada.capacidad,
      habitacionId: seleccionada.id,
      hotelId: seleccionada.Hotel.id,
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
    };

    try {
      await crearReserva(payload);
      setShowResumenModal(false);
      toast.success("Reserva realizada con éxito");
      setSeleccionada(null);
      setMostrarBotonReserva(false);
      setCliente({ cedula: "", nombre: "", apellido: "" });
      setClienteConfirmado(false);
      setForm({ fechaIngreso: "", fechaSalida: "", capacidad: "" });
    } catch (err) {
      toast.error("Error al realizar la reserva");
    } finally {
      setCargandoReserva(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <ReservaForm form={form} setForm={setForm} onBuscar={() => handleBuscar(0)} />
      </div>
      <div
        className="max-w-6xl mx-auto p-4 border rounded shadow"
        style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)" }}
      >
        {habitaciones.length != 0 ? (
          <HabitacionesGrid
            habitaciones={habitaciones}
            onSelect={handleSeleccionHabitacion}
            seleccionada={seleccionada}
          />
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">No hay habitaciones disponibles</h2>
            <p className="text-gray-600">Intente con otras fechas o capacidad.</p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="self-center">Página {page + 1}</span>
        <button
          disabled={(page + 1) * pageSize >= total}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <ClienteForm
          cliente={cliente}
          setCliente={setCliente}
          onConfirmar={handleConfirmarCliente}
          confirmado={clienteConfirmado}
          setConfirmado={setClienteConfirmado}
        />
      </div>
      <div className="w-full p-6 flex items-end justify-end">
        {mostrarBotonReserva && (
          <button
            onClick={() => setShowResumenModal(true)}
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Confirmar Reserva
          </button>
        )}
      </div>

      <Modal
        isOpen={showResumenModal}
        onClose={() => setShowResumenModal(false)}
        title="Resumen de la Reserva"
      >
        <div className="space-y-2 text-sm">
          <p>
            <strong>Hotel:</strong> {seleccionada?.Hotel?.nombre}
          </p>
          <p>
            <strong>Habitación:</strong> {seleccionada?.numero}
          </p>
          <p>
            <strong>Fechas:</strong> {form.fechaIngreso} → {form.fechaSalida}
          </p>
          <p>
            <strong>Cantidad de personas:</strong> {seleccionada?.capacidad}
          </p>
          <p>
            <strong>Cliente:</strong> {cliente.nombre} {cliente.apellido} (
            {cliente.cedula})
          </p>
        </div>

        <button
          onClick={handleReservar}
          disabled={cargandoReserva}
          className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {cargandoReserva ? (
            <div className="flex items-center justify-center">
            <Loader className="animate-spin w-5 h-5 text-white mr-2" />
              Procesando...
            </div>
          ) : (
            "Confirmar"
          )}
        </button>
      </Modal>
    </>
  );
};

export default ReservaPage;
