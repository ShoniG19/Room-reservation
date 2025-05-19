module.exports = {
  development: {
    username: "postgres",
    password: "admin123",
    database: "hotelReserva",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: "postgres",
    password: "admin123",
    database: "hotelReserva",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
};