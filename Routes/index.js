const express = require("express");
const ControllerPublic = require("../Controllers/index");
const router = express.Router();

//Public
router.post("/hashing", ControllerPublic.convertPlainTextToBcrypt);
router.get("/", ControllerPublic.jadwalwaktusholat);
router.get("/jam", ControllerPublic.clock);
router.get("/bootstrap", ControllerPublic.bootstrap);
router.get("/template", ControllerPublic.template);
router.get("/jamanalogdigital", ControllerPublic.jamanalogdigital);
router.get("/jadwalwaktusholat", ControllerPublic.index);
router.get("/updateCountDown", ControllerPublic.updateCountDown);

module.exports = router;
