const updateCountDownAxios = async () => {
  const countdownElement = document.getElementById("countDown");
  const urlApi = "https://waktusholat.naxgrinting.stb/updateCountDown";
  // const options = {
  //   method: "GET",
  //   url: `${urlApi}`,
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   withCredentials: true,
  // };
  const options = {
    method: "GET",
    url: urlApi,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    // Menggunakan adapter khusus untuk mengabaikan validasi SSL
    adapter: function (config) {
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(config.method.toUpperCase(), config.url, true);

        // Set request headers
        Object.keys(config.headers).forEach(function (key) {
          xhr.setRequestHeader(key, config.headers[key]);
        });

        // Handle response
        xhr.onload = function () {
          resolve({
            data: xhr.response,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            config: config,
            request: xhr,
          });
        };

        // Handle network errors
        xhr.onerror = function () {
          reject(new Error("Network Error"));
        };

        // Set withCredentials if needed
        if (config.withCredentials) {
          xhr.withCredentials = true;
        }

        // Send the request
        xhr.send(config.data);
      });
    },
  };

  try {
    const requestApi = await axios.request(options);
    const dataCountdownStr = requestApi.data.countdownStr;
    const dataSisaMenit = requestApi.data.sisaMenit;
    const words = dataCountdownStr.split(" ");
    const lastWord = words[words.length - 1];
    labelWaktu = lastWord;

    if (labelWaktu) {
      const elementJamDzuhur = document.getElementById("jam-dzuhur");
      const elementMenitDzuhur = document.getElementById("menit-dzuhur");
      const elementJamAshar = document.getElementById("jam-ashar");
      const elementMenitAshar = document.getElementById("menit-ashar");
      const elementJamBukaPuasa = document.getElementById("jam-bukapuasa");
      const elementMenitBukaPuasa = document.getElementById("menit-bukapuasa");
      const elementJamMaghrib = document.getElementById("jam-maghrib");
      const elementMenitMaghrib = document.getElementById("menit-maghrib");
      const elementJamIsya = document.getElementById("jam-isya");
      const elementMenitIsya = document.getElementById("menit-isya");
      const elementJamSahur = document.getElementById("jam-sahur");
      const elementMenitSahur = document.getElementById("menit-sahur");
      const elementJamImsak = document.getElementById("jam-imsak");
      const elementMenitImsak = document.getElementById("menit-imsak");
      const elementJamShubuh = document.getElementById("jam-shubuh");
      const elementMenitShubuh = document.getElementById("menit-shubuh");
      const elementJamTerbit = document.getElementById("jam-terbit");
      const elementMenitTerbit = document.getElementById("menit-terbit");
      const elementJamDhuha = document.getElementById("jam-dhuha");
      const elementMenitDhuha = document.getElementById("menit-dhuha");
      if (labelWaktu === "Dzuhur") {
        console.log("Menuju Waktu Dzuhur");
        elementJamDzuhur.classList.add("blink");
        elementMenitDzuhur.classList.add("blink");
      } else if (labelWaktu === "Ashar") {
        console.log("Menuju Waktu Ashar");
        elementJamAshar.classList.add("blink");
        elementMenitAshar.classList.add("blink");
      } else if (labelWaktu === "Buka Puasa") {
        console.log("Menuju Waktu Buka Puasa");
        elementJamBukaPuasa.classList.add("blink");
        elementMenitBukaPuasa.classList.add("blink");
      } else if (labelWaktu === "Maghrib") {
        console.log("Menuju Waktu Maghrib");
        elementJamMaghrib.classList.add("blink");
        elementMenitMaghrib.classList.add("blink");
      } else if (labelWaktu === "Isya") {
        console.log("Menuju Waktu Isya");
        elementJamIsya.classList.add("blink");
        elementMenitIsya.classList.add("blink");
      } else if (labelWaktu === "Sahur") {
        console.log("Menuju Waktu Sahur");
        elementJamSahur.classList.add("blink");
        elementMenitSahur.classList.add("blink");
      } else if (labelWaktu === "Imsak") {
        console.log("Menuju Waktu Imsak");
        elementJamImsak.classList.add("blink");
        elementMenitImsak.classList.add("blink");
      } else if (labelWaktu === "Shubuh") {
        console.log("Menuju Waktu Shubuh");
        elementJamShubuh.classList.add("blink");
        elementMenitShubuh.classList.add("blink");
      } else if (labelWaktu === "Terbit") {
        console.log("Menuju Waktu Terbit");
        elementJamTerbit.classList.add("blink");
        elementMenitTerbit.classList.add("blink");
      } else if (labelWaktu === "Dhuha") {
        console.log("Menuju Waktu Dhuha");
        elementJamDhuha.classList.add("blink");
        elementMenitDhuha.classList.add("blink");
      } else {
        elementJamDzuhur.classList.remove("blink");
        elementMenitDzuhur.classList.remove("blink");
        elementJamAshar.classList.remove("blink");
        elementMenitAshar.classList.remove("blink");
        elementJamBukaPuasa.classList.remove("blink");
        elementMenitBukaPuasa.classList.remove("blink");
        elementJamMaghrib.classList.remove("blink");
        elementMenitMaghrib.classList.remove("blink");
        elementJamIsya.classList.remove("blink");
        elementMenitIsya.classList.remove("blink");
        elementJamSahur.classList.remove("blink");
        elementMenitSahur.classList.remove("blink");
        elementJamImsak.classList.remove("blink");
        elementMenitImsak.classList.remove("blink");
        elementJamShubuh.classList.remove("blink");
        elementMenitShubuh.classList.remove("blink");
        elementJamTerbit.classList.remove("blink");
        elementMenitTerbit.classList.remove("blink");
        elementJamDhuha.classList.remove("blink");
        elementMenitDhuha.classList.remove("blink");
      }
    } else {
      console.error("Label Waktu tidak tersedia!");
    }

    if (dataCountdownStr) {
      if (countdownElement) {
        countdownElement.innerHTML = dataCountdownStr;
      } else {
        console.error("Element Tidak Ditemukan!");
      }
    } else {
      console.error("Data Count Down Tidak Didapatkan!");
    }

    if (labelWaktu) {
      if (labelWaktu !== "Imsak" || labelWaktu !== "Buka Puasa") {
        const elementAdzan = new Audio("/Mp3/ADZANJIHARKAH_Ahmad_khoir_el.mp3");
        // console.log(`Sisa waktu = ${dataSisaMenit} menit`);
        if (dataSisaMenit) {
          if (dataSisaMenit == 1) {
            console.log("Label Waktu =", labelWaktu);
            countdownElement.textContent = `Waktunya Adzan ${labelWaktu}!!!`;
            countdownElement.classList.add("blink");
            console.log("Play Adzan");
            // elementAdzan.autoplay
            elementAdzan.volume = 1;
            elementAdzan.currentTime = 45;
            // elementAdzan.play();
            document.addEventListener("click", function () {
              const playPromise = elementAdzan.play();

              if (playPromise !== undefined) {
                playPromise
                  .then((_) => {
                    // Pemutaran berhasil dimulai
                    console.log("Play Adzan");
                  })
                  .catch((error) => {
                    // Pemutaran gagal dimulai
                    console.error("Autoplay gagal:", error);
                  });
              }
            });
            setTimeout(function () {
              console.log("Log dan efek blink selama 6 menit.");
              console.log("Stop Adzan ()");
              elementAdzan.pause();
              // Menghapus class "blink" setelah 6 menit
              countdownElement.classList.remove("blink");

              // Menunggu 1 detik (1000 milidetik) sebelum menyembunyikan log
              setTimeout(function () {
                console.clear(); // Menghapus log dari konsol setelah 6 menit
              }, 1000);
            }, 360000);
          }
        }
      } else if (labelWaktu === "Imsak" || labelWaktu === "Buka Puasa") {
        // console.log(`Sisa waktu = ${dataSisaMenit} menit`);
        const elementBlangwir = new Audio("/Mp3/Blangwir.mp3");
        if (dataSisaMenit) {
          if (dataSisaMenit <= 2) {
            countdownElement.textContent = `Waktunya ${labelWaktu}!!!`;
            console.log("Label Waktu =", labelWaktu);
            countdownElement.classList.add("blink");
            console.log("Play Blangwir");
            elementBlangwir.volume = 1;
            elementBlangwir.play();
            setTimeout(function () {
              console.log("Play Blangwir ()");
              console.log("Log dan efek blink selama 5 menit.");

              // Menghapus class "blink" setelah 5 menit
              countdownElement.classList.remove("blink");

              // Menunggu 1 detik (1000 milidetik) sebelum menyembunyikan log
              setTimeout(function () {
                console.clear(); // Menghapus log dari konsol setelah 5 menit
              }, 1000);
            }, 300000);
          }
        }
      } else {
        console.info("Label Waktu =", labelWaktu);
        console.warn("Label Waktu tidak dikenali!");
      }
    }
  } catch (error) {
    console.error("Error Server", error);
  }
};
updateCountDownAxios();
const updateLogic = () => {
  let lastMinute;

  const checkAndUpdate = () => {
    let day = new Date();
    let currentMinute = day.getMinutes();

    // Cek apakah ada perubahan pada menit
    if (currentMinute !== lastMinute) {
      // console.log(`Menit Sekarang ${currentMinute}`);
      updateCountDownAxios();
      lastMinute = currentMinute;
    }
  };
  setInterval(checkAndUpdate, 1000);
};

// Jalankan updateLogic();
updateLogic();

// JAM ANALOG DAN DIGITAL
setInterval(() => {
  let day = new Date();
  // Jam Analog
  const deg = 6;
  const hr = document.querySelector("#hr");
  const min = document.querySelector("#min");
  const sec = document.querySelector("#sec");
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * deg;
  let ss = day.getSeconds() * deg;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  min.style.transform = `rotateZ(${mm}deg)`;
  sec.style.transform = `rotateZ(${ss}deg)`;

  // Jam Digital
  let hours = document.querySelector("#hours");
  let minutes = document.querySelector("#minutes");
  let seconds = document.querySelector("#seconds");
  let zonawaktu = document.querySelector("#zonawaktu");

  let hour = day.getHours();
  let minute = day.getMinutes();
  let second = day.getSeconds();
  let zonaAbbreviation = "";
  let timezone = day.toLocaleTimeString("en-US", {
    timeZoneName: "short",
  });

  if (timezone.includes("GMT+7")) {
    zonaAbbreviation = "WIB";
  } else if (timezone.includes("GMT+8")) {
    zonaAbbreviation = "WITA";
  } else if (timezone.includes("GMT+9")) {
    zonaAbbreviation = "WIT";
  }

  hours.innerHTML = hour < 10 ? "0" + hour : hour;
  minutes.innerHTML = minute < 10 ? "0" + minute : minute;
  seconds.innerHTML = second < 10 ? "0" + second : second;
  zonawaktu.innerHTML = zonaAbbreviation;
});
