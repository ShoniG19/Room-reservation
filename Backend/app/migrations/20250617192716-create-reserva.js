'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reservas", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      fechaIngreso: Sequelize.DATEONLY,
      fechaSalida: Sequelize.DATEONLY,
      cantidadPersonas: Sequelize.INTEGER,
      clienteId: {
        type: Sequelize.BIGINT,
        references: { model: "Clientes", key: "id" },
        onDelete: "CASCADE",
      },
      habitacionId: {
        type: Sequelize.BIGINT,
        references: { model: "Habitacions", key: "id" },
        onDelete: "CASCADE",
      },
      hotelId: {
        type: Sequelize.BIGINT,
        references: { model: "Hotels", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Reservas");
  },
};

