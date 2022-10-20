const User = require("../models/User");

module.exports = (req, res, next) => {
  // har bir sayt uchun alohida session uchun
  User.findById(req.session.userId, (err, user) => {
    // agar "id" mos tushmasa bosh sahifaga yo'naltiradi
    if (err || !user) {
      return res.redirect("/");
    }
    // middleware ishlatiganda next() yozish shart!!!
    // next bu keyingisigi o'tkazish yani bu funksiya tugallangandan keyingi funkisaya navbat beradi
    next();
  });
};
