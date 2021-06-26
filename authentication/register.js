const register = (req, res, User, bcrypt) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, (err, doc) => {
    if (!err) {
      if (doc) {
        res.send({ status: 0 });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (!err) {
            bcrypt.hash(password, salt, async (err, hash) => {
              if (!err) {
                const user = new User({
                  email: email,
                  password: hash,
                });
                await user.save();
                //TODO
                res.send();
              } else {
                res.send(err);
              }
            });
          } else {
            res.send(err);
          }
        });
      }
    } else {
      res.send(err);
    }
  });
};

module.exports = register;
