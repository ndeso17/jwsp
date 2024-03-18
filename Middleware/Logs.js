const logRequest = (req, res, next) => {
  const method = req.method;
  const hostname = req.hostname;
  const protocol = req.protocol;
  const path = req.path;
  const ipClient = req.ip;

  // Get current date and time in the server's timezone
  const currentDate = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZoneName: "short",
  };
  const formattedDateTime = currentDate.toLocaleString("id-ID", options);

  const request = {
    path,
    ipClient,
    hostname,
    protocol,
    method,
    dateTime: formattedDateTime,
  };

  console.log("LOG REQUEST", request);
  next();
};

module.exports = logRequest;
