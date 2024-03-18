require("dotenv").config();
const port = process.env.PORT || 5000;
const domainFrontend = process.env.FRONTEND_LINK;
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//Middleware
const middlewareLogRequest = require("./Middleware/Logs");
//Routes
const route = require("./Routes/index");
const routerCuaca = require("./Routes/RouterCuaca");
const routerJadwalSholat = require("./Routes/RouterJadwalSholat");
//Run
app.set("view engine", "ejs");
app.set("views", __dirname + "/Views");

app.use(
  cors({
    credentials: true,
    origin: domainFrontend,
  })
);
app.use(cookieParser());
app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));
//Run Routes
app.use("/", route);
app.use("/cuaca", routerCuaca);
app.use("/jadwal-sholat", routerJadwalSholat);

app.listen(port, () => {
  console.log(`Server Berjalan pada port ${port}!`);
  console.log("Frontend", domainFrontend);
});
