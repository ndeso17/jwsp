const response = (res, datas) => {
  res.json({
    statusCode: datas.statusCode,
    message: datas.message,
    data: datas.data,
  });
};

module.exports = response;
