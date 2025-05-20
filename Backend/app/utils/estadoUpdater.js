const db = require("../models");
const { Op } = db.Sequelize;
const Reserva = db.Reserva;
const Habitacion = db.Habitacion;

async function actualizarEstadoHabitaciones() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); 

  const reservasOcupadas = await Reserva.findAll({
    where: {
      fechaIngreso: { [Op.lte]: hoy },
      fechaSalida: { [Op.gt]: hoy }
    }
  });
  const idsOcupadas = reservasOcupadas.map(r => r.habitacionId);
  await Habitacion.update(
    { estado: "ocupada" },
    { where: { id: { [Op.in]: idsOcupadas } } }
  );

  const reservasFuturas = await Reserva.findAll({
    where: {
      fechaIngreso: { [Op.gt]: hoy }
    }
  });
  const idsReservadas = reservasFuturas.map(r => r.habitacionId)
    .filter(id => !idsOcupadas.includes(id)); 
  await Habitacion.update(
    { estado: "reservada" },
    { where: { id: { [Op.in]: idsReservadas } } }
  );

  const habitacionesConReserva = [...new Set([...idsOcupadas, ...idsReservadas])];
  await Habitacion.update(
    { estado: "disponible" },
    {
      where: {
        id: { [Op.notIn]: habitacionesConReserva },
        estado: { [Op.not]: "mantenimiento" }
      }
    }
  );
}

module.exports = actualizarEstadoHabitaciones;
