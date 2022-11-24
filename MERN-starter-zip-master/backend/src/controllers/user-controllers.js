const HttpError = require("../models/http-error");
const User = require("../models/user-schema");
const jwt = require("jsonwebtoken")

const signup = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = new User({
      username,
      password,
    });

    await user.save();
    res.status(201).json({ uid: user._id });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password }, { password: 0 });
    if (!user) throw new HttpError("No se encontró al usuario", 400);
    //                                                llave
    const token = jwt.sign({nombreDeseado: user._id},process.env.JWT_SECRET);
    res.status(200).json({token:token});
  } catch (error) {
    return next(error);
  }
};

module.exports = { signup, login };
