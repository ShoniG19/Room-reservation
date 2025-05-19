module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("Cliente", {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      cedula: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Cliente;
  };
  