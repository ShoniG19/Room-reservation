const db = require("../models");
const Cliente = db.Cliente;

// Crear cliente
exports.create = (req, res) => {
  const { cedula, nombre, apellido } = req.body;

  if (!nombre || !apellido || !cedula) {
    return res.status(400).send({
      message: "Nombre, apellido y cedula son obligatorios."
    });
  }

  Cliente.create({ nombre, apellido, cedula })
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el cliente."
      });
    });
};

// Traer todos los clientes
exports.findAll = (req, res) => {
  Cliente.findAll()
    .then(data => res.send(data))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error al traer los clientes."
      });
    });
};

// Traer cliente por ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cliente.findByPk(id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: `No se encontró el cliente con id=${id}.` });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar el cliente con id=" + id
      });
    });
};

// Traer cliente por cédula
exports.findByCedula = (req, res) => {
  const cedula = req.params.cedula;

  Cliente.findOne({ where: { cedula } })
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Cliente no encontrado." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar el cliente por cédula."
      });
    });
};

// Actualizar cliente
exports.update = (req, res) => {
  const id = req.params.id;

  Cliente.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Cliente actualizado correctamente." });
      } else {
        res.send({
          message: `No se pudo actualizar el cliente con id=${id}. Puede que no exista o el cuerpo esté vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el cliente con id=" + id
      });
    });
};

// Eliminar cliente
exports.delete = (req, res) => {
  const id = req.params.id;

  Cliente.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Cliente eliminado correctamente." });
      } else {
        res.send({
          message: `No se pudo eliminar el cliente con id=${id}. Puede que no exista.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al eliminar el cliente con id=" + id
      });
    });
};
