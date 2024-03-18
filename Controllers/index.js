require("dotenv").config();
const bcrypt = require("bcrypt");
const axios = require("axios");
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});
const response = require("../Models/response");
let waktusahur = "";
let waktuimsak = "";
let waktusubuh = "";
let waktuterbit = "";
let waktudhuha = "";
let waktudzuhur = "";
let waktuashar = "";
let waktubukapuasa = "";
let waktumaghrib = "";
let waktuisya = "";

const convertPlainTextToBcrypt = async (req, res) => {
  const { plainText } = req.body;

  if (plainText !== undefined && plainText !== null && plainText !== "") {
    bcrypt.hash(plainText, 10, function (err, hash) {
      if (err) {
        const datas = {
          statusCode: 500,
          message: "Error Encrypt",
          data: err,
        };
        response(res, datas);
      } else {
        const dataEncrypt = {
          plainText: plainText,
          hashed: hash,
        };
        const datas = {
          statusCode: 200,
          message: "Encrypt Success!!!",
          data: dataEncrypt,
        };
        response(res, datas);
      }
    });
  } else {
    const datas = {
      statusCode: 400,
      message: "Error Encrypt, Plain Text is either null or empty",
      data: null,
    };
    response(res, datas);
  }
};

const index = async (req, res) => {
  const urlApi = "http://localhost:4001/jadwal-sholat/getWaktuSholat";
  const options = {
    method: "POST",
    url: `${urlApi}`,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    body: {
      idKota: "1406",
    },
  };
  const requestApi = await axios.request(options);
  const jadwalSholat = requestApi.data.data.data.jadwal;
  console.log("Jadwal Sholat", jadwalSholat);
  const waktuImsak = jadwalSholat.imsak;
  waktuimsak = waktuImsak;
  console.log("Ini Waktu Imsak", waktuImsak);

  res.render("index", {
    pageTitle: "Halaman Utama",
    message: "Selamat datang di aplikasi Node.js!",
    jadwalSholat: jadwalSholat,
  });
};

const clock = async (req, res) => {
  res.render("clock", {
    pageTitle: "Jam Utama",
  });
};

const bootstrap = async (req, res) => {
  res.render("bootstrap", {
    pageTitle: "Bootstrap",
  });
};

const template = async (req, res) => {
  res.render("template", {
    pageTitle: "Template EJS Index",
  });
};

const jamanalogdigital = async (req, res) => {
  res.render("jamanalogdigital", {
    pageTitle: "Analog Digital",
  });
};

const jadwalwaktusholat = async (req, res) => {
  // const urlApi = "http://localhost:4001/jadwal-sholat/getWaktuSholat";
  const urlApi = process.env.URL_LOKAL;
  const endPoint = "jadwal-sholat/getWaktuSholat";
  const options = {
    method: "POST",
    url: `${urlApi}/${endPoint}`,
    headers: {
      "content-type": "application/json",
    },
    httpsAgent: agent,
    withCredentials: true,
    body: {
      idKota: "1406",
    },
  };

  try {
    const requestApi = await axios.request(options);
    const jadwalSholat = requestApi.data.data.data.jadwal;
    const waktuAlarmSahur = {
      jam: "03",
      menit: "00",
      alarm: "03:00",
    };
    waktusahur = waktuAlarmSahur.alarm;
    const waktuImsak = jadwalSholat.imsak;
    waktuimsak = waktuImsak;
    const waktuSubuh = jadwalSholat.subuh;
    waktusubuh = waktuSubuh;
    const waktuTerbit = jadwalSholat.terbit;
    waktuterbit = waktuTerbit;
    const waktuDhuha = jadwalSholat.dhuha;
    waktudhuha = waktuDhuha;
    const waktuDzuhur = jadwalSholat.dzuhur;
    waktudzuhur = waktuDzuhur;
    const waktuAshar = jadwalSholat.ashar;
    waktuashar = waktuAshar;
    const waktuIsya = jadwalSholat.isya;
    waktuisya = waktuIsya;
    const waktuBukaPuasa = jadwalSholat.maghrib;
    waktubukapuasa = waktuBukaPuasa;
    const [jamBukaPuasa, menitBukaPuasa] = waktuBukaPuasa
      .split(":")
      .map(Number);
    const tanggalBukaPuasa = new Date();
    tanggalBukaPuasa.setHours(jamBukaPuasa);
    tanggalBukaPuasa.setMinutes(menitBukaPuasa);
    const waktuMaghrib = new Date(tanggalBukaPuasa.getTime() + 5 * 60000);
    const jamMaghrib = waktuMaghrib.getHours();
    const menitMaghrib = waktuMaghrib.getMinutes();
    const waktuMaghribStr = `${jamMaghrib}:${
      menitMaghrib < 10 ? "0" : ""
    }${menitMaghrib}`;
    waktumaghrib = waktuMaghribStr;

    const countdowns = [
      { waktu: waktuAlarmSahur.alarm, label: "Sahur" },
      { waktu: waktuImsak, label: "Imsak" },
      { waktu: waktuSubuh, label: "Subuh" },
      { waktu: waktuTerbit, label: "Terbit" },
      { waktu: waktuDhuha, label: "Dhuha" },
      { waktu: waktuDzuhur, label: "Dzuhur" },
      { waktu: waktuAshar, label: "Ashar" },
      { waktu: waktuBukaPuasa, label: "Buka Puasa" },
      { waktu: waktuMaghribStr, label: "Maghrib" },
      { waktu: waktuIsya, label: "Isya" },
    ];

    const now = new Date();
    let closestCountdown = null;
    let closestCountdownTime = Infinity;

    for (const countdown of countdowns) {
      try {
        const targetTime = new Date(`${now.toDateString()} ${countdown.waktu}`);
        const countdownTime = targetTime - now;

        if (countdownTime > 0 && countdownTime < closestCountdownTime) {
          closestCountdown = countdown;
          closestCountdownTime = countdownTime;
        }
      } catch (error) {
        console.error(
          `Error parsing time for ${countdown.label}:`,
          error.message
        );
      }
    }

    let countdownStr = "";
    let sisaMenit = "";
    if (closestCountdown) {
      if (!isNaN(closestCountdownTime) && closestCountdownTime >= 0) {
        const totalSeconds = Math.floor(closestCountdownTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        countdownStr = `${hours} Jam ${minutes} Menit Sebelum ${closestCountdown.label}`;
        sisaMenit = minutes;
      } else {
        countdownStr = "Waktu countdown tidak valid";
      }
    } else {
      countdownStr = "Tidak ada waktu countdown yang tersedia";
    }

    res.render("jadwalwaktusholat", {
      pageTitle: "Waktu Penting",
      waktuAlarmSahur,
      waktuImsak,
      waktuSubuh,
      waktuTerbit,
      waktuDhuha,
      waktuDzuhur,
      waktuAshar,
      waktuBukaPuasa,
      waktuMaghribStr,
      waktuIsya,
      countdownStr,
      sisaMenit,
    });
  } catch (error) {
    console.error("Error :", error);
  }
};

function updateJadwalSholat() {
  const now = new Date();
  const tomorrowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, // Jam 00:00
    5, // Menit 05
    0, // Detik 00
    0 // Millidetik 00
  );

  const timeUntilMidnight = tomorrowMidnight - now;
  setInterval(jadwalwaktusholat, timeUntilMidnight);
}
updateJadwalSholat();

const updateCountDown = async (req, res) => {
  try {
    const countdowns = [
      { waktu: waktusahur, label: "Sahur" },
      { waktu: waktuimsak, label: "Imsak" },
      { waktu: waktusubuh, label: "Subuh" },
      { waktu: waktuterbit, label: "Terbit" },
      { waktu: waktudhuha, label: "Dhuha" },
      { waktu: waktudzuhur, label: "Dzuhur" },
      { waktu: waktuashar, label: "Ashar" },
      { waktu: waktubukapuasa, label: "Buka Puasa" },
      { waktu: waktumaghrib, label: "Maghrib" },
      { waktu: waktuisya, label: "Isya" },
    ];

    const imsakCountdown = countdowns.find(
      (countdown) => countdown.label === "Imsak"
    );

    if (imsakCountdown) {
      console.info(`Waktu Imsak: ${imsakCountdown.waktu}`);
    } else {
      console.error("Waktu Imsak tidak ditemukan dalam array countdowns.");
    }

    const now = new Date();
    let closestCountdown = null;
    let closestCountdownTime = Infinity;

    for (const countdown of countdowns) {
      try {
        const targetTime = new Date(`${now.toDateString()} ${countdown.waktu}`);
        const countdownTime = targetTime - now;

        if (countdownTime > 0 && countdownTime < closestCountdownTime) {
          closestCountdown = countdown;
          closestCountdownTime = countdownTime;
        }
      } catch (error) {
        console.error(
          `Error parsing time for ${countdown.label}:`,
          error.message
        );
      }
    }

    let countdownStr = "";

    if (closestCountdown) {
      if (!isNaN(closestCountdownTime) && closestCountdownTime >= 0) {
        const totalSeconds = Math.floor(closestCountdownTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        countdownStr = `${hours} Jam ${minutes} Menit Sebelum ${closestCountdown.label}`;
      } else {
        countdownStr = "Waktu countdown tidak valid";
      }
    } else {
      countdownStr = "&#128511;";
    }

    let sisaMenit = "";
    if (closestCountdown) {
      if (!isNaN(closestCountdownTime) && closestCountdownTime >= 0) {
        const minutes = Math.floor(closestCountdownTime / (1000 * 60));
        sisaMenit = `${minutes}`;
      } else {
        sisaMenit = "Waktu countdown tidak valid";
      }
    } else {
      sisaMenit = "Tidak ada waktu countdown yang tersedia";
    }

    res.json({ countdownStr: countdownStr, sisaMenit });
  } catch (error) {
    console.error("Error :", error);
  }
};

module.exports = {
  convertPlainTextToBcrypt,
  index,
  clock,
  bootstrap,
  template,
  jamanalogdigital,
  jadwalwaktusholat,
  updateCountDown,
};
