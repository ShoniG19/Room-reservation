'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Habitacions", "estado", {
      type: Sequelize.ENUM("disponible", "ocupada", "reservada", "mantenimiento"),
      allowNull: false,
      defaultValue: "disponible"
    });

    await queryInterface.addColumn("Habitacions", "imageUrl", {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Habitacions", "estado");
    await queryInterface.removeColumn("Habitacions", "imageUrl");
  }
};
