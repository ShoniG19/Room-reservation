const db = require("../models");
const Habitacion = db.Habitacion;
const Reserva = db.Reserva;
const { Op } = db.Sequelize;

// Crear habitacion
exports.create = (req, res) => {
  const { numero, hotelId, posX, posY, piso, capacidad, caracteristicas } = req.body;

    if (!numero || !hotelId || !posX || !posY || !piso || !capacidad) {
        return res.status(400).send({ 
            message: "Faltan datos obligatorios." 
        });
    }
    
    Habitacion.create({ numero, hotelId, posX, posY, piso, capacidad, caracteristicas }).
        then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la habitación."
            });
        });
    };  

// Traer todas las habitaciones
exports.findAll = async (req, res) => {
  try{
    const habitaciones = await Habitacion.findAll({
      order:[['id', 'ASC']],
    });
    res.send(habitaciones);
  }catch (err) {
    res.status(500).send({
      message: err.message || "Error al traer las habitaciones.",
    });
  }
};

// Traer todas las habitaciones con reservas
exports.findAllConReservas = async (req, res) => {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const habitaciones = await Habitacion.findAll({
      include: [
        {
          model: Reserva,
          where: {
            fechaIngreso: { [Op.gt]: hoy }
          },
          required: false,
          attributes: ['id', 'fechaIngreso', 'fechaSalida']
        }
      ]
    });
    res.send(habitaciones);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error al traer las habitaciones.",
    });
  }
};

// Traer habitacion por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Habitacion.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No se encontró la habitación con id=${id}.` });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar la habitación con id=" + id
      });
    });
};

// Actualizar habitacion
exports.update = (req, res) => {
  const id = req.params.id;
  
  Habitacion.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Habitación actualizada correctamente." });
      } else {
        res.send({
          message: `No se pudo actualizar la habitación con id=${id}. Puede que no exista o el cuerpo esté vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar la habitación con id=" + id
      });
    });
};

// Eliminar habitacion
exports.delete = (req, res) => {
  const id = req.params.id;

  Habitacion.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Habitación eliminada correctamente." });
      } else {
        res.send({
          message: `No se pudo eliminar la habitación con id=${id}. Puede que no exista.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al eliminar la habitación con id=" + id
      });
    });
};