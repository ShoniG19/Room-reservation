const db = require("../models");
const Hotel = db.Hotel;
const Habitacion = db.Habitacion;
const Sequelize = db.Sequelize;

// Crear hotel
exports.create = (req, res) => {
  const { nombre, direccion } = req.body;

  if (!nombre || !direccion) {
    return res.status(400).send({
      message: "Nombre y dirección son obligatorios."
    });
  }

  Hotel.create({ nombre, direccion })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el hotel."
      });
    });
};

// Traer todos los hoteles
exports.findAll = (req, res) => {
  Hotel.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al traer los hoteles."
      });
    });
};

// Traer hoteles con cantidad de habitaciones
exports.findAllConCantidad = async (req, res) => {
  try {
    const hoteles = await Hotel.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("Habitaciones.id")),
            "cantidadHabitaciones"
          ]
        ]
      },
      include: [
        {
          model: Habitacion,
          as: "habitaciones",
          attributes: [],
          required: false,
        }
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Habitacions" AS habitaciones
              WHERE habitaciones."hotelId" = "Hotel"."id"
            )`),
            "cantidadHabitaciones"
          ],
        ],
      },
      order: [["id", "ASC"]],
    });

    res.send(hoteles);
  } catch (error) {
    console.error(error); 
    res.status(500).send({
      message: "Error al obtener hoteles con cantidad habitaciones.",
      error: error.message
    });
  }
};

// Traer hotel por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hotel.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No se encontró el hotel con id=${id}.` });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar el hotel con id=" + id
      });
    });
};

// Actualizar hotel
exports.update = (req, res) => {
  const id = req.params.id;

  Hotel.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Hotel actualizado correctamente." });
      } else {
        res.send({
          message: `No se pudo actualizar el hotel con id=${id}. Puede que no exista o el cuerpo esté vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el hotel con id=" + id
      });
    });
};

// Eliminar hotel
exports.delete = (req, res) => {
  const id = req.params.id;

  Hotel.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Hotel eliminado correctamente." });
      } else {
        res.send({
          message: `No se pudo eliminar el hotel con id=${id}. Puede que no exista.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el hotel con id=" + id
      });
    });
};
