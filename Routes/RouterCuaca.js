const express = require("express");
const ControllerCuaca = require("../Controllers/GetCuaca");
const router = express.Router();

//Cuaca
router.post("/getCuacaByProvinsi", ControllerCuaca.getCuacaByProvinsi);
router.post("/getCuacaByKabupaten", ControllerCuaca.getCuacaByKab);
router.post("/getIdKabupaten", ControllerCuaca.getIdKabupaten);
router.post("/getIdProvinsi", ControllerCuaca.getIdProvinsi);

module.exports = router;
