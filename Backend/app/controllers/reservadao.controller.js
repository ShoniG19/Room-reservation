const db = require("../models");
const Reserva = db.Reserva;
const Cliente = db.Cliente;
const Habitacion = db.Habitacion;
const Hotel = db.Hotel;
const { Op } = db.Sequelize;

// Buscar habitaciones disponibles
exports.buscarDisponibles = async (req, res) => {
  const { fechaIngreso, fechaSalida, capacidad, nombre, offset = 0, limit = 10} = req.query;

  if (!fechaIngreso || !fechaSalida) {
    return res.status(400).send({
      message: "Debe ingresar fechaIngreso y fechaSalida",
    });
  }

  try {
    // Traer todas las habitaciones que NO tienen reservas en conflicto
    const reservasConflictivas = await Reserva.findAll({
      where: {
        [Op.and]: [
          { fechaIngreso: { [Op.lt]: fechaSalida } },
          { fechaSalida: { [Op.gt]: fechaIngreso } },
        ],
      },
      attributes: ["habitacionId"],
    });

    const habitacionesOcupadas = reservasConflictivas.map(
      (r) => r.habitacionId
    );

    const condiciones = {
      id: { [Op.notIn]: habitacionesOcupadas },
    };

    if (capacidad) {
      condiciones.capacidad = { [Op.gte]: capacidad };
    }

    const includeHotel = {
      model: Hotel,
    };

    if (nombre) {
      includeHotel.where = {
        nombre: { [Op.iLike]: `%${nombre}%` },
      };
    }

    const { count, rows } = await Habitacion.findAndCountAll({
      where: condiciones,
      include: [includeHotel],
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [
        ['numero', 'ASC'],
        ['piso', 'ASC']
      ],
    });

    res.send({
      total: count,
      data: rows,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error al buscar habitaciones disponibles",
      error,
    });
  }
};

// Crear reserva
exports.create = async (req, res) => {
  const {
    hotelId,
    habitacionId,
    fechaIngreso,
    fechaSalida,
    cedula,
    nombre,
    apellido,
    cantidadPersonas,
  } = req.body;
  
  if (
    !hotelId ||
    !habitacionId ||
    !fechaIngreso ||
    !fechaSalida ||
    !cedula ||
    !cantidadPersonas
  ) {
    return res.status(400).send({
      message: "Faltan datos obligatorios.",
    });
  }

  try {
    let cliente = await Cliente.findOne({ where: { cedula } });
    if (!cliente) {
      if (!nombre || !apellido) {
        return res
          .status(400)
          .send({ message: "Cliente nuevo: nombre y apellido requeridos" });
      }

      cliente = await Cliente.create({ cedula, nombre, apellido });
    }

    // Crear la reserva
    const nuevaReserva = await Reserva.create({
      hotelId,
      habitacionId,
      fechaIngreso,
      fechaSalida,
      clienteId: cliente.id,
      cantidadPersonas,
    });

    if (new Date(fechaIngreso) <= new Date()) {
      await Habitacion.update(
        { estado: "ocupada" },
        { where: { id: habitacionId } }
      );
    }

    res.send(nuevaReserva);
  } catch (error) {
    return res.status(500).send({
      message: "Error al crear la reserva.",
      error: error.message,
    });
  }
};

// Traer todas las reservas
exports.findAll = async (req, res) => {
  try{
   const reservas = await Reserva.findAll({
    include: [
      {
        model: Cliente,
        attributes: ["id", "nombre", "apellido", "cedula"],
      },
      {
        model: Habitacion,
        attributes: ["id", "numero", "piso"],
        include: {
          model: Hotel,
          attributes: ["id", "nombre"],
        },
      },
    ],
    order: [
      ["fechaIngreso", "ASC"],
      [Habitacion, "piso", "ASC"],
      [Habitacion, "numero", "ASC"],
    ],
   });
    res.send(reservas);
  }catch (error) {
    return res.status(500).send({
      message: "Error al obtener las reservas.",
      error: error.message,
    });
  }
};


// Traer todas las reservas con filtros
exports.findAllFilter = async (req, res) => {
  try {
    const { hotelId, fechaIngreso, fechaSalida, cliente, limit = 10, offset = 0 } = req.query;
  
    const where = {};

    if (fechaIngreso) {
      where.fechaIngreso = { [Op.gte]: fechaIngreso };
    }

    if (fechaSalida) {
      where.fechaSalida = { [Op.lte]: fechaSalida };
    }

    if (hotelId && hotelId !== "") {
      where.hotelId = hotelId;
    }

    const result = await Reserva.findAndCountAll({
      where,
      include: [
        {
          model: Cliente,
          attributes: ["id", "nombre", "apellido", "cedula"],
          where: cliente ? { cedula: cliente } : {},
        },
        {
          model: Habitacion,
          attributes: ["id", "numero", "piso"],
          include: {
            model: Hotel,
            ...(hotelId && hotelId !== "" ? { where: { id: hotelId } } : {}),
            attributes: ["id", "nombre"],
          },
        },
      ],
      order: [
        ["fechaIngreso", "ASC"],
        [Habitacion, "piso", "ASC"],
        [Habitacion, "numero", "ASC"],
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.send({
      total: result.count,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error al obtener las reservas.",
      error: error.message,
    });
  }
};
