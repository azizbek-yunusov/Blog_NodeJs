const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  User.create(req.body, async (err, user) => {
    // agar error bersa sahifani o'zida qoladi
    if (err) {
      const registrationError = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
      req.flash("registrationError", registrationError);
      req.flash("data", req.body)
      return res.redirect("/reg");
    }
    // parolni shriftlab beradi gensaltga 10 miqdor kiritiladi
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // saqlash uchun
    user.save();

    // xatolik kuzatilmasa bosh sahifa o'tadi
    res.redirect("/");
  });
};
