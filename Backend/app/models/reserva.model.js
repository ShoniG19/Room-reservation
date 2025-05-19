module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("Reserva", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      fechaIngreso: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      fechaSalida: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      cantidadPersonas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return Reserva;
  };
  