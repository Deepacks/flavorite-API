const login = (req, res, User, bcrypt) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, doc) => {
    if (!doc) {
      res.send({ status: 0 });
    } else {
      if (!err) {
        const hash = doc.password;
        bcrypt.compare(password, hash, (err, success) => {
          if (!err) {
            if (success) {
              //TODO
              res.send({ status: 1 });
            } else {
              res.send({ status: 0 });
            }
          } else {
            res.send(err);
          }
        });
      } else {
        res.send(err);
      }
    }
  });
};

module.exports = login;
