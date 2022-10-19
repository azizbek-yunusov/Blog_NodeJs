module.exports = (req, res, next) => {
  // agar formada biron input to'ldirilmasa
  if (
    !(req.files && req.files.image) ||
    !req.body.title ||
    !req.body.username
  ) {
    // yana forma page qaytaradi
    return res.redirect("/posts/new");
  }
  next();
};
