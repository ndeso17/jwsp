require("dotenv").config();
const axios = require("axios");
const response = require("../Models/response");

const getIdProvinsi = async (req, res) => {
  const urlApi = process.env.URL_API_CUACA;
  const endPoint = "provinces";

  const options = {
    method: "GET",
    url: `${urlApi}/${endPoint}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    withCredentials: true,
  };
  try {
    const requestApi = await axios.request(options);

    const cleanedData = JSON.parse(JSON.stringify(requestApi.data));
    const dataIdProvinsi = cleanedData.data;
    const idProvinsi = dataIdProvinsi.map((item) => ({
      id: item.id,
      provinsi: item.name,
    }));

    const datas = {
      statusCode: 201,
      message: "Id Provinsi",
      data: idProvinsi,
    };
    response(res, datas);
  } catch (error) {
    // console.error(error);
    const datas = {
      statusCode: 500,
      message: "Server Error",
      data: error,
    };
    response(res, datas);
  }
};

const getIdKabupaten = async (req, res) => {
  const urlApi = process.env.URL_API_CUACA;
  const endPoint = "weather";
  const idProvinsi = req.body.idProvinsi;
  const options = {
    method: "GET",
    url: `${urlApi}/${endPoint}/${idProvinsi}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    withCredentials: true,
  };
  try {
    if (idProvinsi !== undefined && idProvinsi !== null && idProvinsi !== "") {
      const requestApi = await axios.request(options);

      const cleanedData = JSON.parse(JSON.stringify(requestApi.data));
      const area = cleanedData.data.forecast.area;

      const idDescriptionArray = area.map((item) => ({
        id: item.id,
        "kabupaten/kota": item.name[1],
      }));

      console.log("Array nilai id dan description:", idDescriptionArray);

      const datas = {
        statusCode: 201,
        message: "Id Kabupaten",
        data: idDescriptionArray,
      };
      response(res, datas);
    } else {
      const datas = {
        statusCode: 400,
        message:
          "Anda harus menyertakan data idProvinsi juga, idProvinsi dapat diambil dari /cuaca/getIdProvinsi",
        data: null,
      };
      response(res, datas);
    }
  } catch (error) {
    console.error(error);
    const datas = {
      statusCode: 500,
      message: "Server Error",
      data: error,
    };
    response(res, datas);
  }
};

const getCuacaByProvinsi = async (req, res) => {
  const urlApi = process.env.URL_API_CUACA;
  const endPoint = "weather";
  const idProvinsi = req.body.idProvinsi;
  const options = {
    method: "GET",
    url: `${urlApi}/${endPoint}/${idProvinsi}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    withCredentials: true,
  };
  try {
    if (idProvinsi !== undefined && idProvinsi !== null && idProvinsi !== "") {
      const requestApi = await axios.request(options);

      const cleanedData = JSON.parse(JSON.stringify(requestApi.data));
      const area = cleanedData.data.forecast.area;

      const datas = {
        statusCode: 201,
        message: "Cuaca By Provinsi",
        data: area,
      };
      response(res, datas);
    } else {
      const datas = {
        statusCode: 400,
        message:
          "Anda harus menyertakan data idProvinsi juga, idProvinsi dapat diambil dari /cuaca/getIdProvinsi",
        data: null,
      };
      response(res, datas);
    }
  } catch (error) {
    console.error(error);
    const datas = {
      statusCode: 500,
      message: "Server Error",
      data: error,
    };
    response(res, datas);
  }
};

const getCuacaByKab = async (req, res) => {
  const urlApi = process.env.URL_API_CUACA;
  const endPoint = "weather";
  const idProvinsi = req.body.idProvinsi;
  const idKabupaten = req.body.idKabupaten;
  const options = {
    method: "GET",
    url: `${urlApi}/${endPoint}/${idProvinsi}`,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    withCredentials: true,
  };
  try {
    if (idProvinsi !== undefined && idProvinsi !== null && idProvinsi !== "") {
      const requestApi = await axios.request(options);
      const cleanedData = JSON.parse(JSON.stringify(requestApi.data));
      const area = cleanedData.data.forecast.area;
      const kabupatenArea = area.find((area) => area.id === idKabupaten);

      const dataParameter = kabupatenArea.parameter;
      const parameterHumidity = dataParameter.find(
        (parameter) => parameter.description === "Humidity"
      );
      const parameterTemperature = dataParameter.find(
        (parameter) => parameter.description === "Temperature"
      );

      function getLatestData(parameter) {
        const latestData = parameter.timerange.reduce((latest, current) => {
          return new Date(current.datetime) > new Date(latest.datetime)
            ? current
            : latest;
        });

        return latestData.value[0].text;
      }

      const humidityLatest = getLatestData(parameterHumidity);
      const temperatureLatest = getLatestData(parameterTemperature);
      const dataCuaca = {
        kabupaten: kabupatenArea.name[0],
        provinsi: kabupatenArea.domain,
        kelembaban: humidityLatest + "%",
        suhu: temperatureLatest + "°C",
      };

      const datas = {
        statusCode: 201,
        message: "Cuaca By Kabupaten",
        data: dataCuaca,
      };
      response(res, datas);
    } else {
      const datas = {
        statusCode: 400,
        message:
          "Anda harus menyertakan data idProvinsi dan idKabupaten juga, idProvinsi dapat diambil dari /cuaca/getIdProvinsi, idKabupaten dapat diambil dari /cuaca/getIdKabupaten.",
        data: null,
      };
      response(res, datas);
    }
  } catch (error) {
    console.error(error);
    const datas = {
      statusCode: 500,
      message: "Server Error",
      data: error,
    };
    response(res, datas);
  }
};

module.exports = {
  getCuacaByProvinsi,
  getCuacaByKab,
  getIdKabupaten,
  getIdProvinsi,
};
