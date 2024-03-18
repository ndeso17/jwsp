const express = require("express");
const router = express.Router();
const ControllerJadwalSholat = require("../Controllers/JadwalSholat");

//Jadwal Sholat
router.post("/getWaktuSholat", ControllerJadwalSholat.getWaktu);

module.exports = router;
