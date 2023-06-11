const mongoose = require("mongoose");
const Joi = require("joi");

let userSchema = new mongoose.Schema({
  fullName: {
    firstName: String,
    lastName: String
  },
  email: String,
  password: String,
  date_created: {
    type: Date, default: Date.now()
  },
  role: {
    type: String, default: "user"
  }
})

exports.UserModel = mongoose.model("users", userSchema);

exports.validUser = (_reqBody) => {
  let joiSchema = Joi.object({
    fullName: {
      firstName: Joi.string().min(2).max(50).required(),
      lastName: Joi.string().min(2).max(50).required(),
    },
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required()
  })
  return joiSchema.validate(_reqBody);
}

exports.validLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required()
  })

  return joiSchema.validate(_reqBody);
}
