module.exports = {
  development: {
    username: process.env.bd_user,
    password: process.env.bd_password,
    database: process.env.bd_name,
    host: process.env.bd_host,
    port: process.env.bd_port,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.bd_user,
    password: process.env.bd_password,
    database: process.env.bd_name,
    host: process.env.bd_host,
    port: process.env.bd_port,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
};