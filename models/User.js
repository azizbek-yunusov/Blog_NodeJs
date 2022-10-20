const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Place, provide your username"]
  },
  email: {
    type: String,
    required: [true, "Place, provide your email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Place, provide your password"] 
  }
})

const User = mongoose.model("User", UserSchema);
module.exports = User