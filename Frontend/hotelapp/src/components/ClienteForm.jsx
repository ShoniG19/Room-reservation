import React, { useState } from "react";
import Modal from "./Modal";

import { getClientePorCedula } from "../api/clienteApi";

const ClienteForm = ({
  cliente,
  setCliente,
  onConfirmar,
  confirmado,
  setConfirmado,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleContinuar = async () => {
    if (!cliente.cedula) return alert("Ingrese su cédula");

    const existente = await getClientePorCedula(cliente.cedula);
    if (existente) {
      setCliente(existente);
      onConfirmar();
    } else {
      setShowModal(true);
    }
  };

  const changeCliente = () => {
    setCliente({ cedula: "", nombre: "", apellido: "" });
    setConfirmado(false);
  };

  const handleFinalizarDatos = () => {
    if (!cliente.nombre || !cliente.apellido) {
      return alert("Complete nombre y apellido para continuar.");
    }
    setShowModal(false);
    onConfirmar();
  };

  if (confirmado) {
    return (
      <div
        className="mt-6 bg-white p-6 border rounded shadow"
        style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)" }}
      >
        <h2 className="text-xl font-bold mb-4">
          Bienvenido, {cliente.nombre}!
        </h2>
        <p className="mb-1">
          <strong>Cedula:</strong> {cliente.cedula}
        </p>
        <p className="">
          <strong>Nombre completo:</strong> {cliente.nombre} {cliente.apellido}
        </p>
        <button
          onClick={changeCliente}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Cambiar Cliente
        </button>
      </div>
    );
  }

  return (
    <div
      className="mt-6 bg-white p-6 border rounded shadow"
      style={{ boxShadow: "0 10px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <h2 className="text-xl font-bold mb-4">Informacion del Cliente</h2>
      <div className="grid grid-rows-2">
        <p className="font-bold">Cedula</p>
        <input
          type="text"
          value={cliente.cedula}
          onChange={(e) => setCliente({ ...cliente, cedula: e.target.value })}
          className="border px-3 py-1 rounded"
          placeholder="Ingrese su Nro de Cedula"
        />
      </div>
      <button
        onClick={handleContinuar}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Continuar
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Registrar nuevo cliente"
      >
        <div className="grid grid-rows-3 gap-3 mb-4">
          <input
            placeholder="Cedula"
            value={cliente.cedula}
            onChange={(e) => setCliente({ ...cliente, cedula: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Nombre"
            value={cliente.nombre}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
            className="border px-3 py-2 rounded"
          />
          <input
            placeholder="Apellido"
            value={cliente.apellido}
            onChange={(e) =>
              setCliente({ ...cliente, apellido: e.target.value })
            }
            className="border px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleFinalizarDatos}
          className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-400"
        >
          Confirmar Datos
        </button>
      </Modal>
    </div>
  );
};

export default ClienteForm;
