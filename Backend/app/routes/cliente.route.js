module.exports = app => {
    const cliente = require("../controllers/clientedao.controller.js");
    const router = require("express").Router();

    router.post("/", cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:id", cliente.findOne);
    router.get("/cedula/:cedula", cliente.findByCedula);
    router.put("/:id", cliente.update);
    router.delete("/:id", cliente.delete);
    
    app.use("/api/cliente", router);
}