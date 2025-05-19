module.exports = app => {
    const habitacion = require("../controllers/habitaciondao.controller.js");
    const router = require("express").Router();
  
    router.post("/", habitacion.create);
    router.get("/", habitacion.findAll);
    router.get("/reservas", habitacion.findAllConReservas);
    router.get("/:id", habitacion.findOne);
    router.put("/:id", habitacion.update);
    router.delete("/:id", habitacion.delete);
  
    app.use("/api/habitacion", router);
  }