const Movie = require("../models/movie-schema");

const postMovies = async (req, res, next) => {
  const movies = req.body;
  try {
    await Movie.insertMany(movies);
    res.status(201).json({message: "Ok"})
  } catch (error) {
    return next(error);
  }
};

const getMovies = async(req,res,netx)=>{
  try{
    const movies = await Movie.find()
    res.status(200).json({menssage: "show of movies", movies:movies})
  }catch(error){
    console.log(error);
    return next(error)
  }
}

module.exports = { postMovies, getMovies };
