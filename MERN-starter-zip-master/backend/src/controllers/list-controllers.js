const HttpError = require("../models/http-error");
const { ObjectId } = require("mongoose").Types;
const List = require("../models/list-schema");
const jwt = require('jsonwebtoken')

const createList = async (req, res, next) => {
  const { uid } = req.body;
  try {
    const list = new List({
      user: ObjectId(uid),
      movies: [],
    });

    await list.save();
    res.status(201).json({ list });
  } catch (error) {
    return next(error);
  }
};

const addMovie = async (req, res, next) => {
  const { movieId, uid } = req.body;
  try {
    const list = await List.findOneAndUpdate(
      { user: ObjectId(uid) },
      { $push: { movies: ObjectId(movieId) } },
      { new: true }
    );

    if (!list) throw new HttpError("El usuario no tiene lista", 400);
    res.status(201).json({ list });
  } catch (error) {
    return next(error);
  }
};

const getUserListItems = async (req, res, next) => {
  //obtenemos el id del usario y lo requerimos
  //const { uid } = req.params;
  try {
    //extraer el token--si la propiedad autoriazation exite vamo hacer esto sino undefanied-- split aggara string y separa segun lo que le pasemos
    const token = req.headers?.authorization?.split(" ")[1];//0 beader //1:token
    if(!token) throw new HttpError("no se provee el token", 403)
    const decodedToken =jwt.verify(token, process.env.JWT_SECRET);//token llave
    if(!decodedToken)throw new HttpError("El token no es autentico", 401)
    console.log(decodedToken)

    const listItems = await List.findOne({user: ObjectId(decodedToken.nombreDeseado)}, {movies: 1}).populate("movies");
    if (!listItems) throw new HttpError("El usuario no tiene lista", 400)
    res.json(listItems)
  } catch (error) {
    return next(error);
  }
};

module.exports = { createList, addMovie, getUserListItems };
