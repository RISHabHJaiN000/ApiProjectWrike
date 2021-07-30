const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const token = new Schema({
  token: {
    type: String,
    required: true
    },
  name: {
    type: String,
    required: true
    }
    
});
const Token = mongoose.model("Token", token);
module.exports = Token;