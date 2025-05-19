import axios from "axios";

const API_URL = "http://localhost:9891/api/cliente";

// Buscar cliente por cédula
export const getClientePorCedula = async (cedula) => {
  try {
    const response = await axios.get(`${API_URL}/cedula/${cedula}`);
    return response.data;
  } catch (err) {
    // Si no se encuentra el cliente, devolver null
    if (err.response && err.response.status === 404) {
      return null;
    }
    throw err;
  }
};

// Crear nuevo cliente (si querés usarlo más adelante)
export const crearCliente = async (cliente) => {
  const response = await axios.post(`${API_URL}`, cliente);
  return response.data;
};
