import axios from "axios";

const API_URL = "http://localhost:9891/api/habitacion";

export const getHabitaciones = async () => {
    try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    throw error;
  }
}

export const getHabitacionesConReservas = async () => {
    try {
    const res = await axios.get(`${API_URL}/reservas`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    throw error;
  }
}