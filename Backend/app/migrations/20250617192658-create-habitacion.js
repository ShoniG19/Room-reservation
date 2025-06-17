'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Habitacions", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      numero: Sequelize.STRING,
      posX: Sequelize.INTEGER,
      posY: Sequelize.INTEGER,
      piso: Sequelize.STRING,
      capacidad: Sequelize.INTEGER,
      caracteristicas: Sequelize.TEXT,
      estado: {
        type: Sequelize.ENUM("disponible", "ocupada", "reservada", "mantenimiento"),
        defaultValue: "disponible",
      },
      imageUrl: Sequelize.STRING,
      hotelId: {
        type: Sequelize.BIGINT,
        references: { model: "Hotels", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Habitacions");
  },
};

