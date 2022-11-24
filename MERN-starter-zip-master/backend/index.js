const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect("mongodb://localhost:27017/movies_lists")
  .then(() => {
    app.listen(8080, () => console.log("Server running"));
  })
  .catch(console.log);
