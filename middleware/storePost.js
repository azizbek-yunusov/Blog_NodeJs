module.exports = (req, res, next) => {
  if(!(req.files && req.files.image) || !req.body.title || !req.body.username) {
    return res.redirect("/posts/new")
  }
  next();
}
