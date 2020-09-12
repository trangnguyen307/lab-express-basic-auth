const session = require("express-session");
const Mongostore = require("connect-mongo")(session);
const mongoose = require("mongoose");

module.exports = app => {
  app.use(
    session({
      secret: "shhhhhhasdfasdfasdf", // QU'EST CE QUE C'EST ???
      resave: false,
      saveUninitialized: true,
      //cookie: { maxAge: 60000 } // 60 * 1000 ms === 1 min
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      }),
    })
  );
};
