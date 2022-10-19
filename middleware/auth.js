const User = require("../models/User");

module.exports = (req, res, next) => {
  User.findById(req.session.userId, (err, user) => {
    if (err || !user) {
      return res.redirect("/");
    }
    // middleware ishlatiganda next() yozish shart!!!
    // next bu keyingisigi o'tkazish yani bu funksiya tugallangandan keyingi funkisaya navbat beradi
    next();
  });
};
