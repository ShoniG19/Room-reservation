const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const db = require("./app/models");
db.sequelize.sync();

var corsOptions = {
    origin: process.env.frontend_url,
    credentials: true
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a Node Backend 2025." });
});

require("./app/routes/hotel.route.js")(app);
require("./app/routes/habitacion.route.js")(app);
require("./app/routes/cliente.route.js")(app);
require("./app/routes/reserva.route")(app);


// set port, listen for requests
const PORT = process.env.PORT || 9891;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
});

// Actualizar estado de habitaciones
const actualizarEstadoHabitaciones = require("./app/utils/estadoUpdater");
actualizarEstadoHabitaciones()