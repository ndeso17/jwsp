require("dotenv").config();
const axios = require("axios");
const response = require("../Models/response");

const getWaktu = async (req, res) => {
  const urlApi = process.env.URP_API_JADWAL_SHOLAT;
  //   const idKota = req.body.idKota || data.idKota;
  const idKota = "1406";
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, maka tambahkan 1
  const day = String(today.getDate()).padStart(2, "0");

  const tgl = `${year}-${month}-${day}`;

  const options = {
    method: "GET",
    url: `${urlApi}/${idKota}/${tgl}`,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const requestApi = await axios.request(options);
    const cleanedData = JSON.parse(JSON.stringify(requestApi.data));
    const datas = {
      statusCode: 201,
      message: "Jadwal Sholat",
      data: cleanedData,
    };
    response(res, datas);
  } catch (error) {
    const datas = {
      statusCode: 500,
      message: "Server Error",
      data: error,
    };
    response(res, datas);
  }
};

module.exports = { getWaktu };
