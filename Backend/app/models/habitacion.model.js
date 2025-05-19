module.exports = (sequelize, Sequelize) => {
    const Habitacion = sequelize.define("Habitacion", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      numero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      posX: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      posY: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      piso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      caracteristicas: {
        type: Sequelize.TEXT,
      },
      estado: {
        type: Sequelize.ENUM("disponible", "ocupada", "reservada", "mantenimiento"),
        allowNull: false,
        defaultValue: "disponible",
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  
    return Habitacion;
  };
  