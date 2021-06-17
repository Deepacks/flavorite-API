const allowCORS = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept"
    );
    next();
  });
};

module.exports = allowCORS;
