module.exports = app => {
    const reserva = require("../controllers/reservadao.controller.js");
    const router = require("express").Router();

    router.post("/", reserva.create);
    router.get("/", reserva.findAll);
    router.get("/filtros", reserva.findAllFilter);
    router.get("/buscar", reserva.buscarDisponibles);

    app.use("/api/reservas", router);
}