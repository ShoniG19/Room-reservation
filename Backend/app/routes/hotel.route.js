module.exports = app => {
    const hotel = require("../controllers/hoteldao.controller.js");
    const router = require("express").Router();
  
    router.post("/", hotel.create);
    router.get("/", hotel.findAll);
    router.get("/habitaciones", hotel.findAllConCantidad)
    router.get("/:id", hotel.findOne);
    router.put("/:id", hotel.update);
    router.delete("/:id", hotel.delete);
  
    app.use("/api/hotel", router);
  };
  