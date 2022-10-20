const User = require("../models/User");
const bcrypt = require("bcrypt")

module.exports = (req, res) => {
  const { password, email } = req.body;
  User.findOne({ email }, (err, user) => { // findOne - mongoDbni methodi
    if (user) {
      const validPassword = bcrypt.compare(password, user.password) // compare - solishtiradi ya'ni taqqoslaydi, same - bir xillik
      if (validPassword) {
        // cookie uchun id berilayapti "id" si bazadagi "id"ga tenglashmoqda
        req.session.userId = user._id;
        res.redirect("/")
      }
      else {
        res.redirect("/login")
      }
    }
    else {
      return res.redirect("/login")
    }
  })
}