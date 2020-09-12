const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const salt = bcryptjs.genSaltSync(saltRounds);
const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  const passwordHash = bcryptjs.hashSync(password, salt);

  User.create({
    username,
    email,
    passwordHash,
  })
    .then(userFromDb => {
      console.log("User created");
      res.redirect("/signup");
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {

  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;

  if (!email || !password) {
    res.render("auth/login", {
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({
    email: email,
  })
    .then(user => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Incorrect email/password",
        });
        return;
      }
      if (bcryptjs.compareSync(password, user.passwordHash)) {
        req.session.user = user;
        res.send("loggé!");

        
      } else {
        res.render("auth/login", {
          errorMessage: "Incorrect email / password",
        });
      }
    })
    .catch(err => next(err));
});

router.get('/main', (req, res,next) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  res.render('protect/main')
});

router.get('/private', (req, res,next) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  res.render('protect/private');
})

module.exports = router;
