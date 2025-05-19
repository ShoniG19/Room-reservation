const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/db.config.js")[env];
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.Habitacion = require("./habitacion.model.js")(sequelize, Sequelize);
db.Cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.Reserva = require("./reserva.model.js")(sequelize, Sequelize);

// Relaciones
db.Hotel.hasMany(db.Habitacion, { foreignKey: "hotelId", as: "habitaciones" });
db.Habitacion.belongsTo(db.Hotel, { foreignKey: "hotelId" });

db.Hotel.hasMany(db.Reserva, { foreignKey: "hotelId" });
db.Reserva.belongsTo(db.Hotel, { foreignKey: "hotelId" });

db.Habitacion.hasMany(db.Reserva, { foreignKey: "habitacionId" });
db.Reserva.belongsTo(db.Habitacion, { foreignKey: "habitacionId" });

db.Cliente.hasMany(db.Reserva, { foreignKey: "clienteId" });
db.Reserva.belongsTo(db.Cliente, { foreignKey: "clienteId" });
module.exports = db;