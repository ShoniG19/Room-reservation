import api from '../utils/api';

// Traer listado de hoteles
export const getListadoHotel = async () => {
  try {
    const response = await api.get(`/hotel`);
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
    const response = await api.get(`/hotel/habitaciones`);
    return response.data;
  } catch (err) {
    
    if (err.response && err.response.status === 404) {
      return null;
    }
    throw err;
  }
};