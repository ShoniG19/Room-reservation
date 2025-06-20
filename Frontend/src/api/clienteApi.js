import api from '../utils/api';

// Buscar cliente por cédula
export const getClientePorCedula = async (cedula) => {
  try {
    const response = await api.get(`/cliente/cedula/${cedula}`);
    return response.data;
  } catch (err) {
    // Si no se encuentra el cliente, devolver null
    if (err.response && err.response.status === 404) {
      return null;
    }
    throw err;
  }
};

export const crearCliente = async (cliente) => {
  const response = await api.post(`/cliente`, cliente);
  return response.data;
};


