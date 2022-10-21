module.exports = (req, res, next) => {
  // foydalanuvchi ro'yhatdan yoki login qilgan bo'lsa reg login sahifalariga o'taolmaydi
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};
