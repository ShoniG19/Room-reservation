import axios from "axios";

const API_URL = "http://localhost:9891/api/reservas";

export const buscarHabitaciones = async (form, page = 0, limit = 10) => {
  const parsedPage = isNaN(page) ? 0 : parseInt(page);
  const parsedPageSize = isNaN(limit) ? 10 : parseInt(limit);


  const params = {
    ...form,
    limit: parsedPageSize,
    offset: parsedPage * parsedPageSize,
  };
  const res = await axios.get(`${API_URL}/buscar`, { params });
  return res.data;
};

export const crearReserva = async (data) => {
  const res = await axios.post(`${API_URL}`, data);
  return res.data;
};

export const getReservas = async () => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

export const getReservasConFiltros = async (filtros, page = 0, pageSize = 10) => {
  const parsedPage = isNaN(page) ? 0 : parseInt(page);
  const parsedPageSize = isNaN(pageSize) ? 10 : parseInt(pageSize);


  const params = {
    ...filtros,
    limit: parsedPageSize,
    offset: parsedPage * parsedPageSize,
  };

  const res = await axios.get(`${API_URL}/filtros`,{params});
  return res.data;
};
