import api from '../utils/api';

export const getHabitaciones = async () => {
    try {
    const res = await api.get(`/habitacion`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    throw error;
  }
}

export const getHabitacionesConReservas = async () => {
    try {
    const res = await api.get(`/habitacion/reservas`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    throw error;
  }
}