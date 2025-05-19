import axios from "axios";

const API_URL = "http://localhost:9891/api/hotel";

// Traer listado de hoteles
export const getListadoHotel = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (err) {
    
    if (err.response && err.response.status === 404) {
      return null;
    }
    throw err;
  }
};

//Traer listado de hoteles con cantidad de habitaciones 
export const getListadoHotelconCantidad = async () => {
  try {
    const response = await axios.get(`${API_URL}/habitaciones`);
    return response.data;
  } catch (err) {
    
    if (err.response && err.response.status === 404) {
      return null;
    }
    throw err;
  }
};