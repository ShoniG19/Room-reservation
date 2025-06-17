import api from "../utils/api";

export const buscarHabitaciones = async (form, page = 0, limit = 10) => {
  const parsedPage = isNaN(page) ? 0 : parseInt(page);
  const parsedPageSize = isNaN(limit) ? 10 : parseInt(limit);


  const params = {
    ...form,
    limit: parsedPageSize,
    offset: parsedPage * parsedPageSize,
  };
  const res = await api.get(`/reservas/buscar`, { params });
  return res.data;
};

export const crearReserva = async (data) => {
  const res = await api.post(`/reservas`, data);
  return res.data;
};

export const getReservas = async () => {
  const res = await api.get(`/reservas`);
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

  const res = await api.get(`/reservas/filtros`, { params });
  return res.data;
};
