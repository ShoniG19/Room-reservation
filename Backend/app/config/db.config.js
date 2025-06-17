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
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.bd_user,
    password: process.env.bd_password,
    database: process.env.bd_name,
    host: process.env.bd_host,
    port: process.env.bd_port,
    sslmode: process.env.bd_ssl,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
};