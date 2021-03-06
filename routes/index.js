const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const isAuth = require("../lib/userUtils").isAuth;
const isUser = require("../lib/userUtils").isUser;
const hasAuth = require("../lib/userUtils").hasAuth;
const Bookmark = require("../models/BookmarkModel");
const User = require("../models/UserModel");
const Switch = require("../models/SwitchModel");

// -------------- AUTHENTICATION --------------

router.post("/api/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (err) throw err;
    if (user) res.send({ status: 1 });
    else {
      const genSaltHash = genPassword(req.body.password);

      const hash = genSaltHash.hash;
      const salt = genSaltHash.salt;

      const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
      });
      await newUser.save();
      res.send({ status: 200 });
    }
  });
});

router.post("/api/login", isUser, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send({ status: 0 });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send({ status: 200 });
      });
    }
  })(req, res, next);
});

router.get("/api/logout", (req, res) => {
  req.logOut();
  res.send({ status: 200 });
});

// -------------- <BOOKMARKS> --------------

router
  .route("/bookmarks")

  .get(isAuth, (req, res) => {
    Bookmark.find({})
      .then((bookmarks) => {
        res.send(bookmarks);
      })
      .catch((err) => console.log("err:" + err));
  })

  .post((req, res) => {
    const newBookmark = new Bookmark({
      id: "666",
      title: req.body.title,
      image:
        "https://www.google.com/s2/favicons?sz=64&domain_url=" + req.body.url,
      url: req.body.url,
      description: req.body.description,
      like: false,
    });

    // update id to mongo's _id (dual API compatibility)
    newBookmark.save(() => {
      Bookmark.find({ id: 666 }, (err, doc) => {
        if (!err) {
          doc[0].id = doc[0]._id;
          doc[0].save(() => {
            res.send();
          });
        } else {
          console.log("err:" + err);
        }
      });
    });
  });

// -------------- <BOOKMARKS/:ID> --------------

router
  .route("/bookmarks/:id")

  .put((req, res) => {
    if (req.body.title || req.body.description) {
      Bookmark.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          description: req.body.description,
        },
        () => res.send()
      );
    } else if (req.body.like || req.body.like === false) {
      Bookmark.findByIdAndUpdate(
        req.params.id,
        {
          like: req.body.like,
        },
        () => {
          res.send();
        }
      );
    }
  })

  .delete((req, res) => {
    Bookmark.findByIdAndRemove(req.params.id, () => {
      res.send();
    });
  });

// -------------- <API/SWITCH> --------------

router
  .route("/api/switch")

  .get((req, res) => {
    Switch.find({}, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log("err:" + err);
      }
    });
  })

  .put((req, res) => {
    const id = "60ca265f4db3081c2510fe49";
    Switch.findByIdAndUpdate(
      id,
      {
        python: req.body.python,
      },
      () => {
        res.send();
      }
    );
  });

module.exports = router;
// hhaggdffwChwbfgjeAbcegucwwCbnjebcjebCbcebjeuAbchgvuwe
