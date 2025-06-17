const obtenerFechasHoyYManana = () => {
  const hoy = new Date();
  const mañana = new Date();
  mañana.setDate(hoy.getDate() + 1);

  const formatear = (date) => date.toISOString().split("T")[0];
  return {
    fechaIngreso: formatear(hoy),
    fechaSalida: formatear(mañana),
  };
};

export default obtenerFechasHoyYManana; 
