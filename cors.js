const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, WWW-Authenticate, Cookie, Set-Cookie, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Request-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, WWW-Authenticate, Cookie, Set-Cookie, Accept"
  );
  res.header("Access-Control-Request-Method", "GET,HEAD,PUT,PATCH,POST,DELETE");

  next();
};

module.exports = cors;
